import { model, Model, Schema } from 'mongoose'

const PaymentSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
  moments: [{ type: Schema.Types.ObjectId, ref: 'Moment' }],
  amount: Number,
  paid: Boolean,
  status: String,
  receipt: String,
  stripeCharge: Object,
  purchased: Date
})

const Payment: Model<IPayment> = model<IPayment>('Payment', PaymentSchema)

export { Payment }
