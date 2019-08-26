import { User } from '../schema'

async function create({
  firstName,
  lastName,
  email,
  username,
  password
}): Promise<IUser> {
  const user = await User.findOne({ username })

  if (user) {
    throw new Error('Username is already taken')
  }

  return await User.create({ firstName, lastName, email, username, password })
}

export { create }
