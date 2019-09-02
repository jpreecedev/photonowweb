import { Types } from 'mongoose'
import { Order } from '../schema'

async function getOrder(orderId: Types.ObjectId) {
  return Order.findOne({ _id: orderId }).exec()
}

export { getOrder }
