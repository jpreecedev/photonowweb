import { model, Schema, Document } from 'mongoose'

interface IUser extends Document {
  id: String
  jwtoken: String
  accessToken: String
  refreshToken: String
  provider: String
  businessName: String
  address: String
  lat: Number
  lng: Number
  profile: {
    emailAddress: String
    firstName: String
    lastName: String
    picture: {
      height: Number
      width: Number
      url: String
    }
  }
  stripeCustomerId: String
}

const UserSchema = new Schema({
  id: String,
  jwtoken: String,
  accessToken: String,
  refreshToken: String,
  provider: String,
  businessName: String,
  address: String,
  lat: Number,
  lng: Number,
  profile: {
    emailAddress: String,
    firstName: String,
    lastName: String,
    picture: {
      height: Number,
      width: Number,
      url: String
    }
  },
  stripeCustomerId: String
})

const User = model<IUser>('User', UserSchema)

export { User, IUser }
