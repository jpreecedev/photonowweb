import { User } from '../schema'

async function getUser(id) {
  return await User.findOne({
    id
  }).exec()
}

async function getUserBy({ ...rest }) {
  return await User.findOne({
    ...rest
  }).exec()
}

export { getUser, getUserBy }
