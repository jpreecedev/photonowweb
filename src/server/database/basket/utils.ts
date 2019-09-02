import { Order, Store } from '../schema'
import { DEFAULT_MOMENT_PRICE } from '../../config'

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

  await asyncForEach(order.moments, async (moment: IMoment) => {
    const storeSettings = await Store.findOne({
      photographerId: moment.photographerId
    }).exec()

    let amount = Number.parseInt(DEFAULT_MOMENT_PRICE)

    if (storeSettings) {
      amount = storeSettings.singleImagePrice
    }

    //eslint-disable-next-line
    moment.amount = amount
  })

  order.amount = order.moments.reduce((acc, current) => (acc += current.amount), 0)

  return order
}

async function calculateOrderAmount(moments: IMoment[]) {
  await asyncForEach(moments, async (moment: IMoment) => {
    const storeSettings = await Store.findOne({
      photographerId: moment.photographerId
    }).exec()

    let amount = Number.parseInt(DEFAULT_MOMENT_PRICE)

    if (storeSettings) {
      amount = storeSettings.singleImagePrice
    }

    //eslint-disable-next-line
    moment.amount = amount
  })

  return moments.reduce((acc, current) => (acc += current.amount), 0)
}

async function priceEachMoment(moments: IMoment[]) {
  await asyncForEach(moments, async (moment: IMoment) => {
    const storeSettings = await Store.findOne({
      photographerId: moment.photographerId
    }).exec()

    let amount = Number.parseInt(DEFAULT_MOMENT_PRICE)

    if (storeSettings) {
      amount = storeSettings.singleImagePrice
    }

    //eslint-disable-next-line
    moment.amount = amount
  })
}

export { getOrder, calculateOrderAmount, priceEachMoment }
