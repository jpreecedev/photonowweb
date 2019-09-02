import { Response } from 'express'
import stripeFactory from 'stripe'
import { Types } from 'mongoose'

import { create } from '../database/payment'
import { createOrder } from '../database/basket'
import { errors } from '../utils'
import { STRIPE_SECRET_KEY } from '../config'
import { getMoments } from 'database/moments'
import { calculateOrderAmount } from 'database/basket/utils'

const stripe = stripeFactory(STRIPE_SECRET_KEY)

async function post(req: RequestWithUser, res: Response) {
  try {
    const { tokenId, billingDetails, moments } = req.body
    const {
      name,
      email,
      addressLine1,
      addressLine2,
      city,
      postalCode,
      state,
      country
    } = billingDetails

    const momentIds: Types.ObjectId[] = moments.reduce(
      (acc: Types.ObjectId[], current: IMoment) => {
        acc.push(current.momentId)
        return acc
      },
      []
    )

    const completeMoments = await getMoments(momentIds)

    const amount = calculateOrderAmount(completeMoments)

    const newOrder = <IOrder>{
      moments: momentIds,
      amount,
      name,
      email,
      addressLine1,
      addressLine2,
      city,
      postalCode,
      state,
      country
    }

    const order = await createOrder(newOrder)

    const result = await stripe.charges.create({
      amount,
      currency: 'gbp',
      description: `Purchase of precious moments (${name})`,
      source: tokenId
    })

    const paymentSaved = await create({
      orderId: order._id,
      moments: momentIds,
      amount: order.amount,
      paid: result.paid,
      status: result.status,
      receipt_url: result.receipt_url,
      stripeCharge: result,
      purchased: new Date()
    })

    if (paymentSaved) {
      return res.status(200).json({
        success: true,
        redirectUrl: `/order-confirmation/${order._id}`
      })
    }

    return res.status(500).send({})
  } catch (e) {
    errors.handle(e)
    return res.status(500).send(e)
  }
}

export default { post }
