import { initDb, drop } from 'mongo-unit'
import { Types } from 'mongoose'
import { sanitizeData } from '../../test-utils'
import { deleteOrderItem } from '..'

const testMongoUrl = process.env.DB_CONNECTION_STRING

describe('Delete order tests', () => {
  beforeEach(async () => {
    const testData = require('./delete.json')
    await initDb(testMongoUrl, sanitizeData(testData))
  })

  afterEach(async () => {
    await drop()
  })

  test('should not delete the order item when the user does not have the order', async () => {
    const orderId = Types.ObjectId('9ddd2370562d178fdfd1de99')
    const customerId = Types.ObjectId('5dfc2370562b178fdfa1be91')
    const momentId = Types.ObjectId('4ccc2370562b178fdfa1be11')

    const result = await deleteOrderItem(orderId, customerId, momentId)

    expect(result).to.be.undefined
  })

  test('should delete the order item', async () => {
    const orderId = Types.ObjectId('9ddd2370562d178fdfd1de99')
    const customerId = Types.ObjectId('5cfc2370562b178fdfa1be91')
    const momentId = Types.ObjectId('4ccc2370562b178fdfa1be11')

    const result = await deleteOrderItem(orderId, customerId, momentId)
    expect(result).not.to.be.undefined
    expect(result.moments).not.to.be.undefined
    expect(result.moments.length).to.equal(1)
    expect(result.moments[0]._id.toString()).to.equal('4bcc2370562b178fdfa1be11')
  })
})
