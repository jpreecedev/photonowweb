import { model, Model, Schema, Types } from 'mongoose'

const PaymentSchema = new Schema({
  orderId: { type: Types.ObjectId, ref: 'Order' },
  moments: [{ type: Types.ObjectId, ref: 'Moment' }],
  amount: Number,
  paid: Boolean,
  status: String,
  receipt: String,
  stripeCharge: Object,
  purchased: Date
})

const Payment: Model<IPayment> = model<IPayment>('Payment', PaymentSchema)

export { Payment }
