import { initDb, drop } from 'mongo-unit'
import { Types } from 'mongoose'
import { sanitizeData } from '../../test-utils'
import { getOrder } from '../utils'

const testMongoUrl = process.env.DB_CONNECTION_STRING

describe('Utils tests', () => {
  let testData = require('./utils.json')

  beforeEach(async () => {
    testData = sanitizeData(testData)
    await initDb(testMongoUrl, testData)
  })

  afterEach(async () => {
    await drop()
  })

  test('should get the order with appropriate supporting data', async () => {
    const query = {
      customerId: Types.ObjectId('1cfc2370562b178fdfa1be91')
    }

    const order = await getOrder(query)

    expect(order).not.to.be.undefined
    expect(order.customerId.toString()).to.equal(query.customerId.toString())
    expect(order.moments.length).to.equal(2)
    expect(order.moments[0]._id.toString()).to.equal(
      testData.orders[0].moments[0].toString()
    )
    expect(order.moments[0].amount).to.equal(100)
    expect(order.moments[1].amount).to.equal(100)
    expect(order.amount).to.equal(200)
  })
})
