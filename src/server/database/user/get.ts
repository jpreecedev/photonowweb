import { User } from '../schema'

async function getUser(id) {
  return await User.findOne({
    id
  }).exec()
}

export { getUser }
