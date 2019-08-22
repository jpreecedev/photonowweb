import { Types } from 'mongoose'
import { sanitizeData } from '../../test-utils'
import { addMomentToOrder } from '../../basket'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Update order tests', () => {
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
    const testData = require('./update.json')
    await dbHelper.seed(sanitizeData(testData))
  })

  test('should add a moment to an existing order', async () => {
    const customerId = Types.ObjectId('1cfc2370562b178fdfa1be91')
    const orderId = Types.ObjectId('9aaa2370562a178fdfa1ae99')
    const momentId = Types.ObjectId('4bbb2370562b178fdfa1be44')

    const order = await addMomentToOrder(customerId, orderId, momentId)

    expect(order).not.toBeUndefined()
    expect(order.moments).not.toBeUndefined()
    expect(order.moments.length).toEqual(1)
    expect(order.moments[0]._id.toString()).toEqual(momentId.toString())
  })

  test('should not add a moment to an existing order when customer id is wrong', async () => {
    const customerId = Types.ObjectId('2cfc2370562b178fdfa1be91')
    const orderId = Types.ObjectId('9aaa2370562a178fdfa1ae99')
    const momentId = Types.ObjectId('4bbb2370562b178fdfa1be44')

    const order = await addMomentToOrder(customerId, orderId, momentId)

    expect(order).toBeUndefined()
  })
})
