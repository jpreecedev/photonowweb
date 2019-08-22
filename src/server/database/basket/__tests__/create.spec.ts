import { Types } from 'mongoose'
import { createOrder } from '../create'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Create order tests', () => {
  beforeAll(async () => {
    await dbHelper.start()
  })

  afterAll(async () => {
    await dbHelper.stop()
  })

  afterEach(async () => {
    await dbHelper.cleanup()
  })

  test('should create an order', async () => {
    const customerId = Types.ObjectId('1cfc2370562b178fdfa1be91')

    const order = await createOrder(customerId)

    expect(order.customerId.toString()).toEqual(customerId.toString())
    expect(order.amount).toEqual(0)
    expect(order.moments).not.toBeUndefined()
    expect(order.moments.length).toEqual(0)
  })
})
