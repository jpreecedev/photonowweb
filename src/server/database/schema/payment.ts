const { Schema } = require('mongoose')

const PaymentSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'User' },
  orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
  moments: [String],
  amount: Number,
  paid: Boolean,
  status: String,
  receipt: String,
  stripeCharge: Object,
  purchased: Date
})

module.exports = { PaymentSchema }
