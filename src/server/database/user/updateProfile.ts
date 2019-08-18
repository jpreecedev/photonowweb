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

  if (ok) {
    return await User.findOne({ id: userId }).exec()
  }

  return null
}

export { updateProfile }
