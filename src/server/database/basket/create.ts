const { Order } = require('../schema')

async function createOrder(customerId) {
  return await new Order({
    customerId,
    moments: [],
    amount: 0
  }).save()
}

module.exports = { createOrder }
