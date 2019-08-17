import { Schema } from 'mongoose'

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

export { UserSchema }
