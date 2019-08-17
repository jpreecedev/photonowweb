import { User } from '../schema'

async function getProfile(id) {
  return await User.findOne({
    id
  })
    .select('profile')
    .exec()
}

export { getProfile }
