const { Order, Store } = require('../schema')
const { DEFAULT_MOMENT_PRICE } = require('../../config')

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

async function getOrder(query) {
  const order = await Order.findOne(query)
    .populate({
      path: 'moments',
      select: ['photographerId', 'filename', 'resizedLocation', 'mimeType']
    })
    .exec()

  await asyncForEach(order.moments, async moment => {
    const storeSettings = await Store.findOne({
      photographerId: moment.photographerId
    }).exec()

    let amount = DEFAULT_MOMENT_PRICE

    if (storeSettings) {
      amount = storeSettings.singleImagePrice
    }

    //eslint-disable-next-line
    moment.amount = amount
  })

  order.amount = order.moments.reduce((acc, current) => (acc += current.amount), 0)

  return order
}

module.exports = { getOrder }
