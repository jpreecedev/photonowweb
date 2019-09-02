import { Types } from 'mongoose'
import { Order } from '../schema'

async function getOrder(orderId: Types.ObjectId) {
  return Order.findById(orderId)
    .populate({
      path: 'moments',
      select: ['filename', 'location', 'resizedLocation', 'mimeType']
    })
    .exec()
}

export { getOrder }
