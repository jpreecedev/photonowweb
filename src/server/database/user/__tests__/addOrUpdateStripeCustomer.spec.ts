const { expect } = require('chai')
const { initDb, drop } = require('mongo-unit')
const { Types } = require('mongoose')

const { addOrUpdateStripeCustomer } = require('../../user')

const testMongoUrl = process.env.DB_CONNECTION_STRING

describe('Stripe token tests', () => {
  const testData = require('./addOrUpdateStripeCustomer.json')

  beforeEach(async () => {
    await initDb(testMongoUrl, testData)
  })

  afterEach(async () => {
    await drop()
  })

  it('should update the stripe token', async () => {
    const id = Types.ObjectId(testData.users[0]._id)
    const stripeCustomerId = '123ABC'

    const result = await addOrUpdateStripeCustomer(id, stripeCustomerId)

    expect(result).to.not.be.undefined
    expect(result.stripeCustomerId).to.not.be.undefined
    expect(result.stripeCustomerId).to.equal(stripeCustomerId)
  })
})
