const { expect } = require('chai')
const { initDb, drop } = require('mongo-unit')
const { Types } = require('mongoose')

const { createOrder } = require('../create')

const testMongoUrl = process.env.DB_CONNECTION_STRING

describe('Create order tests', () => {
  const testData = require('./create.json')

  beforeEach(async () => {
    await initDb(testMongoUrl, testData)
  })

  afterEach(async () => {
    await drop()
  })

  it('should create an order', async () => {
    const customerId = Types.ObjectId('1cfc2370562b178fdfa1be91')

    const order = await createOrder(customerId)

    expect(order.customerId.toString()).to.equal(customerId.toString())
    expect(order.amount).to.equal(0)
    expect(order.moments).not.to.be.undefined
    expect(order.moments.length).to.equal(0)
  })
})
