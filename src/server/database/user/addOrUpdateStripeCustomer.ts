import { User } from '../schema'

async function addOrUpdateStripeCustomer(userId, stripeCustomerId) {
  const user = await User.findById(userId)
  if (!user) {
    return
  }

  user.stripeCustomerId = stripeCustomerId

  await User.updateOne({ _id: userId }, user, {
    upsert: true,
    setDefaultsOnInsert: true
  }).exec()

  return user
}

export { addOrUpdateStripeCustomer }
