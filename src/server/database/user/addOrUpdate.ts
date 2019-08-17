import { User } from '../schema'

async function addOrUpdate(user) {
  const { ok } = await User.updateOne({ id: user.id }, user, {
    upsert: true,
    setDefaultsOnInsert: true
  }).exec()

  let result = user
  if (ok) {
    result = await User.findOne({ id: user.id }).exec()
  }

  return result
}

export { addOrUpdate }
