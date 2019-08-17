import { User } from '../schema'

async function updateProfile(userId, profile) {
  const { ok } = await User.updateOne(
    { id: userId },
    { profile },
    {
      upsert: true,
      setDefaultsOnInsert: true
    }
  ).exec()

  let result = null
  if (ok) {
    result = await User.findOne({ id: userId }).exec()
  }

  return result
}

export { updateProfile }
