import { Types } from 'mongoose'
import { sanitizeData } from '../../test-utils'
import { getOrder, getOrders } from '..'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Get order tests', () => {
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
    const testData = require('./get-order.json')
    await dbHelper.seed(sanitizeData(testData))
  })

  test('should get the order when order id is supplied', async () => {
    const orderId = Types.ObjectId('9aaa2370562a178fdfa1ae99')
    const customerId = Types.ObjectId('1cfc2370562b178fdfa1be91')

    const order = await getOrder(customerId, orderId)

    expect(order).not.toBeUndefined()
    expect(order._id.toString()).toEqual(orderId.toString())
  })

  test('should get all the orders for the given customer', async () => {
    const customerId = Types.ObjectId('5cfc2370562b178fdfa1be91')

    const orders = await getOrders(customerId)

    expect(orders).not.toBeUndefined()
    expect(orders.length).toEqual(2)
    expect(orders[0]._id.toString()).toEqual('9ddd2370562d178fdfd1de99')
    expect(orders[1]._id.toString()).toEqual('9eee2370562d178fdfd1de99')
  })
})
