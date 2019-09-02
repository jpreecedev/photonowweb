import { Types } from 'mongoose'
import { sanitizeData } from '../../test-utils'
import { getOrderForCustomer, userHasOrder } from '..'
import TestDbHelper from '../../../../../config/jest/mongo-setup'
import { calculateOrderAmount } from '../utils'
import { getMoments } from 'database/moments'

const dbHelper = new TestDbHelper()

describe('Get order tests', () => {
  let testData = require('./get.json')

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

  test('should get the order', async () => {
    const customerId = Types.ObjectId('1cfc2370562b178fdfa1be91')

    const order = await getOrderForCustomer(customerId)

    expect(order).not.toBeUndefined()
    expect(order.customerId.toString()).toEqual(customerId.toString())
    expect(order.moments.length).toEqual(1)
    expect(order.moments[0]._id.toString()).toEqual(
      testData.orders[0].moments[0].toString()
    )
    expect(order.amount).toEqual(testData.orders[0].amount)
  })

  test('should verify that the user can access the order', async () => {
    const customerId = Types.ObjectId('1cfc2370562b178fdfa1be91')
    const orderId = Types.ObjectId('9aaa2370562a178fdfa1ae99')

    const hasOrder = await userHasOrder(customerId, orderId)

    expect(hasOrder).toBeTruthy()
  })

  test('should verify that the user cannot access the order', async () => {
    const customerId = Types.ObjectId('1dfc2370562b178fdfa1be91')
    const orderId = Types.ObjectId('9aaa2370562a178fdfa1ae99')

    const hasOrder = await userHasOrder(customerId, orderId)

    expect(hasOrder).toBeFalsy()
  })

  test('should calculate the correct order amount', async () => {
    const momentIds = [
      Types.ObjectId('9ccc2370562b178fdfa1be11'),
      Types.ObjectId('4ccc2370562b178fdfa1be11')
    ]
    const moments = await getMoments(momentIds)

    const amount = await calculateOrderAmount(moments)

    expect(amount).toEqual(524)
  })
})
