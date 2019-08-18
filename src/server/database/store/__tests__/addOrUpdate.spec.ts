import { initDb, drop } from 'mongo-unit'
import { addOrUpdate } from '..'
import { Types } from 'mongoose'

const testMongoUrl = process.env.DB_CONNECTION_STRING

describe('Add or update store tests', () => {
  const testData = require('./addOrUpdate.json')

  beforeEach(async () => {
    await initDb(testMongoUrl, testData)
  })

  afterEach(async () => {
    await drop()
  })

  test('should create new store settings', async () => {
    const photographerId = Types.ObjectId('9bfc2370562b178fdfa1be99')

    const storeSettings = {
      singleImagePrice: 9834.44
    }

    let result = await addOrUpdate(photographerId, storeSettings)

    expect(result.photographerId).to.not.be.undefined
    expect(result.photographerId.toString()).to.equal(photographerId.toString())

    expect(result.singleImagePrice).to.not.be.undefined
    expect(result.singleImagePrice).to.equal(storeSettings.singleImagePrice)

    storeSettings.singleImagePrice = 4433.22
    result = await addOrUpdate(photographerId, storeSettings)
    expect(result.singleImagePrice).to.equal(storeSettings.singleImagePrice)
  })
})
