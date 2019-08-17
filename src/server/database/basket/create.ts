import { Order } from '../schema'

async function createOrder(customerId) {
  return await new Order({
    customerId,
    moments: [],
    amount: 0
  }).save()
}

export { createOrder }
