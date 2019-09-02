import { Order } from '../schema'

async function createOrder(order: IOrder) {
  return await new Order(order).save()
}

export { createOrder }
