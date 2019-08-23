import { User } from '../schema'

async function findOrCreate(
  profile: Profile,
  accessToken: string,
  refreshToken: string
): Promise<IUser> {
  let user = await User.findOne({ id: profile.id })

  if (!user) {
    user = await User.create({ ...profile, id: profile.id, accessToken, refreshToken })
  }

  return user
}

export { findOrCreate }
