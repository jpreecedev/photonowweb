import { Store } from '../schema'

async function addOrUpdate(photographerId, storeSettings) {
  const { ok } = await Store.updateOne({ photographerId }, storeSettings, {
    upsert: true,
    setDefaultsOnInsert: true
  }).exec()

  let result = storeSettings
  if (ok) {
    result = await Store.findOne({ photographerId }).exec()
  }
  return result
}

export { addOrUpdate }
