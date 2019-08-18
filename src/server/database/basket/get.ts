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

async function orderHasMomentAdded(customerId, orderId, momentId) {
  const result = await Order.findOne({
    _id: orderId,
    customerId
  }).exec()

  if (!result) {
    return false
  }

  return (
    result.moments.find(moment => moment.toString() === momentId.toString()) !== undefined
  )
}

export { getOrderForCustomer, userHasOrder, orderHasMomentAdded }