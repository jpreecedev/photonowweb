const { Store } = require('../schema')

const { DEFAULT_MOMENT_PRICE } = require('../../config')

async function getPrice(photographerId) {
  const result = await Store.findOne({ photographerId }).exec()
  if (!result) {
    return DEFAULT_MOMENT_PRICE
  }

  return result.singleImagePrice
}

module.exports = getPrice
