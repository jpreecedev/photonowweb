import { Schema } from 'mongoose'

const StoreSchema = new Schema({
  photographerId: { type: Schema.Types.ObjectId, ref: 'User' },
  singleImagePrice: Number
})

export { StoreSchema }
