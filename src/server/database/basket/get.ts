import { Order } from '../schema'
import { getOrder } from './utils'

async function getOrderForCustomer(customerId) {
  return await getOrder({ customerId })
}

async function userHasOrder(customerId, orderId) {
  const result = await Order.findOne({
    _id: orderId,
    customerId
  }).exec()
  return result !== undefined && result !== null
}

export { getOrderForCustomer, userHasOrder }
