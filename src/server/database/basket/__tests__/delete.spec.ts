import { Types } from 'mongoose'
import { sanitizeData } from '../../test-utils'
import { deleteOrderItem } from '..'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Delete order tests', () => {
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
    const testData = require('./delete.json')
    await dbHelper.seed(sanitizeData(testData))
  })

  test('should not delete the order item when the user does not have the order', async () => {
    const orderId = Types.ObjectId('9ddd2370562d178fdfd1de99')
    const customerId = Types.ObjectId('5dfc2370562b178fdfa1be91')
    const momentId = Types.ObjectId('4ccc2370562b178fdfa1be11')

    const result = await deleteOrderItem(orderId, customerId, momentId)

    expect(result).toBeUndefined()
  })

  test('should delete the order item', async () => {
    const orderId = Types.ObjectId('9ddd2370562d178fdfd1de99')
    const customerId = Types.ObjectId('5cfc2370562b178fdfa1be91')
    const momentId = Types.ObjectId('4ccc2370562b178fdfa1be11')

    const result = await deleteOrderItem(orderId, customerId, momentId)
    expect(result).not.toBeUndefined()
    expect(result.moments).not.toBeUndefined()
    expect(result.moments.length).toEqual(1)
    expect(result.moments[0]._id.toString()).toEqual('4bcc2370562b178fdfa1be11')
  })
})
