import { Store } from '../schema'
import { DEFAULT_MOMENT_PRICE } from '../../config'

async function getPrice(photographerId) {
  const result = await Store.findOne({ photographerId }).exec()
  if (!result) {
    return DEFAULT_MOMENT_PRICE
  }

  return result.singleImagePrice
}

export { getPrice }
