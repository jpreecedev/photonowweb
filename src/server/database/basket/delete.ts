const { Order } = require('../schema')
const { getOrder } = require('./utils')

async function deleteOrderItem(orderId, customerId, momentId) {
  const order = await Order.findOne({
    _id: orderId,
    customerId
  })
    .populate({
      path: 'moments',
      select: ['filename', 'resizedLocation', 'mimeType', 'price']
    })
    .exec()

  if (order) {
    order.moments = order.moments.filter(x => x._id.toString() !== momentId.toString())

    const { ok } = await Order.updateOne({ _id: orderId }, order, {
      upsert: false,
      setDefaultsOnInsert: false
    }).exec()

    if (ok === 1) {
      return await getOrder({ _id: orderId, customerId })
    }

    return undefined
  }

  return undefined
}

module.exports = { deleteOrderItem }
