const { Types } = require('mongoose')
const { expect } = require('chai')
const { initDb, drop } = require('mongo-unit')
const { sanitizeData } = require('../../test-utils')

const { getPayment } = require('..')

const testMongoUrl = process.env.DB_CONNECTION_STRING

describe('Get payment tests', () => {
  const testData = require('./get.json')

  beforeEach(async () => {
    await initDb(testMongoUrl, sanitizeData(testData))
  })

  afterEach(async () => {
    await drop()
  })

  it('should get the payment', async () => {
    const paymentId = Types.ObjectId('1dfd2340562b148fdfa1be91')

    const payment = await getPayment(paymentId)

    expect(payment.customerId.toString()).to.equal(
      testData.payments[0].customerId.toString()
    )
    expect(payment.amount).to.equal(testData.payments[0].amount)
    expect(payment.moments.length).to.equal(1)
    expect(payment.moments[0]).to.equal(testData.payments[0].moments[0])
  })
})
