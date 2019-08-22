import { Types } from 'mongoose'
import { sanitizeData } from '../../test-utils'
import { getPayment } from '..'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Get payment tests', () => {
  const testData = require('./get.json')

  beforeAll(async () => {
    await dbHelper.start()
  })

  afterAll(async () => {
    await dbHelper.stop()
  })

  afterEach(async () => {
    await dbHelper.cleanup()
  })

  beforeEach(async () => {
    await dbHelper.seed(sanitizeData(testData))
  })

  test('should get the payment', async () => {
    const paymentId = Types.ObjectId('1dfd2340562b148fdfa1be91')

    const payment = await getPayment(paymentId)

    expect(payment.customerId.toString()).toEqual(
      testData.payments[0].customerId.toString()
    )
    expect(payment.amount).toEqual(testData.payments[0].amount)
    expect(payment.moments.length).toEqual(1)
    expect(payment.moments[0].toString()).toEqual(
      testData.payments[0].moments[0].toString()
    )
  })
})
