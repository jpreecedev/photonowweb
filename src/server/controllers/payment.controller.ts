import { errors } from '../utils';
import { STRIPE_SECRET_KEY } from '../config';
import { addOrUpdateStripeCustomer } from '../database/user';
import { create } from '../database/payment';
import { getOrder } from '../database/basket/utils';
import stripeFactory from 'stripe';
const stripe = stripeFactory(STRIPE_SECRET_KEY);

async function findOrCreateStripeCustomer(user, tokenId) {
  if (user.stripeCustomerId) {
    const newSource = await stripe.customers.createSource(user.stripeCustomerId, {
      source: tokenId
    })
    const customer = await stripe.customers.update(user.stripeCustomerId, {
      default_source: newSource.id
    })
    return customer
  }

  return stripe.customers.create({
    email: user.profile.emailAddress,
    source: tokenId
  })
}

async function post(req, res) {
  try {
    const { _id, profile } = req.user
    const { firstName, lastName } = profile
    const { tokenId } = req.body

    const stripeCustomer = await findOrCreateStripeCustomer(req.user, tokenId)
    await addOrUpdateStripeCustomer(req.user._id, stripeCustomer.id)

    const order = await getOrder({ customerId: _id })

    const result = await stripe.charges.create({
      amount: Math.round(order.amount * 100),
      currency: 'gbp',
      customer: stripeCustomer.id,
      source: stripeCustomer.default_source.id,
      description: `Purchase of precious moments (${firstName} ${lastName})`,
      order: order._id.toString()
    })

    const momentPaths = order.moments.map(moment => moment.location)

    const paymentSaved = await create({
      customerId: _id,
      orderId: order._id,
      moments: momentPaths,
      amount: order.amount,
      paid: result.paid,
      status: result.status,
      receipt_url: result.receipt_url,
      stripeCharge: result,
      purchased: new Date()
    })

    if (paymentSaved) {
      return res.status(200).json({
        orderId: order._id,
        customerId: _id,
        moments: momentPaths,
        receipt: result.receipt_url
      })
    }

    return res.status(500).send({})
  } catch (e) {
    errors.handle(e)
    return res.status(500).send(e)
  }
}

export default { post };
