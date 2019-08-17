const { expect } = require('chai')
const { initDb, drop } = require('mongo-unit')
const { sanitizeData } = require('../../test-utils')

const { getPrice } = require('../../store')
const { Types } = require('mongoose')

const testMongoUrl = process.env.DB_CONNECTION_STRING

describe('Get Price tests', () => {
  let testData = require('./getPrice.json')

  beforeEach(async () => {
    await initDb(testMongoUrl, sanitizeData(testData))
  })

  afterEach(async () => {
    await drop()
  })

  it('should get the price for an existing store', async () => {
    const photographerId = Types.ObjectId('9bfc2370562b178fdfa1be99')

    const singleImagePrice = await getPrice(photographerId)

    expect(singleImagePrice).to.not.be.undefined
    expect(singleImagePrice).to.equal(testData.stores[0].singleImagePrice)
  })
})
