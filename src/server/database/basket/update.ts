const { Order } = require('../schema')
const { getOrder } = require('./utils')

async function addMomentToOrder(customerId, orderId, momentId) {
  const order = await Order.findOne({
    _id: orderId,
    customerId
  })
    .populate({
      path: 'moments',
      select: ['filename', 'resizedLocation', 'mimeType', 'price']
    })
    .exec()

  if (!order) {
    return undefined
  }

  order.moments.push(momentId)

  const { ok } = await Order.updateOne({ _id: order._id }, order, {
    upsert: false,
    setDefaultsOnInsert: false
  }).exec()

  if (ok === 1) {
    return await getOrder({ _id: orderId, customerId })
  }

  return undefined
}

module.exports = { addMomentToOrder }
