import { Schema } from 'mongoose'

const OrderSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'User' },
  moments: [{ type: Schema.Types.ObjectId, ref: 'Moment' }],
  amount: Number,
  closed: Boolean
})

export { OrderSchema }
