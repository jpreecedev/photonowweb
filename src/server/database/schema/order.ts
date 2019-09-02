import { model, Model, Schema, Types } from 'mongoose'

const OrderSchema = new Schema({
  moments: [{ type: Types.ObjectId, ref: 'Moment' }],
  amount: Number,
  name: String,
  email: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  postalCode: String,
  state: String,
  country: String
})

const Order: Model<IOrder> = model<IOrder>('Order', OrderSchema)

export { Order }
