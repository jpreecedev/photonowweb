import { Order } from '../schema'

async function getOrder(customerId, orderId) {
  return Order.findOne({ _id: orderId, customerId }).exec()
}

async function getOrders(customerId) {
  return Order.find({ customerId }).exec()
}

export { getOrder, getOrders }
