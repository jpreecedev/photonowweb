import { Types } from 'mongoose'
import { sanitizeData } from '../../test-utils'
import { getOrder } from '../utils'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Utils tests', () => {
  let testData = require('./utils.json')

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

  test('should get the order with appropriate supporting data', async () => {
    const query = {
      customerId: Types.ObjectId('1cfc2370562b178fdfa1be91')
    }

    const order = await getOrder(query)

    expect(order).not.toBeUndefined()
    expect(order.customerId.toString()).toEqual(query.customerId.toString())
    expect(order.moments.length).toEqual(2)
    expect(order.moments[0]._id.toString()).toEqual(
      testData.orders[0].moments[0].toString()
    )
    expect(order.moments[0].amount).toEqual(100)
    expect(order.moments[1].amount).toEqual(100)
    expect(order.amount).toEqual(200)
  })
})
