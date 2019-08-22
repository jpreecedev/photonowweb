import { Schema } from 'mongoose'

const PaymentSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'User' },
  orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
  moments: [{ type: Schema.Types.ObjectId, ref: 'Moment' }],
  amount: Number,
  paid: Boolean,
  status: String,
  receipt: String,
  stripeCharge: Object,
  purchased: Date
})

export { PaymentSchema }
