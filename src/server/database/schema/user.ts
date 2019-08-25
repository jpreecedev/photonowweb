import { model, Model, Schema } from 'mongoose'

const UserSchema = new Schema({
  id: String,
  accessToken: String,
  refreshToken: String,
  provider: String,
  businessName: String,
  address: String,
  lat: Number,
  lng: Number,
  email: String,
  displayName: String,
  username: String,
  selectedPhoto: String,
  stripeCustomerId: String
})

const User: Model<IUser> = model<IUser>('User', UserSchema)

export { User }
