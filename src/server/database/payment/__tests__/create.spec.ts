import { Types } from 'mongoose'
import { initDb, drop } from 'mongo-unit'
import { sanitizeData } from '../../test-utils'
import { create } from '..'

const testMongoUrl = process.env.DB_CONNECTION_STRING

describe('Create payment tests', () => {
  beforeEach(async () => {
    const testData = require('./create.json')
    await initDb(testMongoUrl, sanitizeData(testData))
  })

  afterEach(async () => {
    await drop()
  })

  test('should create a payment', async () => {
    const newPayment = {
      customerId: Types.ObjectId('1cfc2370562b178fdfa1be91'),
      photographerId: Types.ObjectId('1dfd2370562d198fdfa1de91'),
      moments: [Types.ObjectId('9ccc2370562b178fdfa1be11')],
      amount: 600,
      paid: true,
      status: 'succeeded',
      receipt: 'http://some_url/',
      stripeCharge: { cameFromStripe: true },
      purchased: new Date()
    }

    const paymentSaved = await create(newPayment)

    expect(paymentSaved).to.be.true
  })
})
