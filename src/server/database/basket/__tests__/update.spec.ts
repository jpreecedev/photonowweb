import { initDb, drop } from 'mongo-unit';
import { Types } from 'mongoose';
import { sanitizeData } from '../../test-utils';
import { addMomentToOrder } from '../../basket';

const testMongoUrl = process.env.DB_CONNECTION_STRING

describe('Update order tests', () => {
  beforeEach(async () => {
    const testData = require('./update.json')
    await initDb(testMongoUrl, sanitizeData(testData))
  })

  afterEach(async () => {
    await drop()
  })

  test('should add a moment to an existing order', async () => {
    const customerId = Types.ObjectId('1cfc2370562b178fdfa1be91')
    const orderId = Types.ObjectId('9aaa2370562a178fdfa1ae99')
    const momentId = Types.ObjectId('4bbb2370562b178fdfa1be44')

    const order = await addMomentToOrder(customerId, orderId, momentId)

    expect(order).not.to.be.undefined
    expect(order.moments).not.to.be.undefined
    expect(order.moments.length).to.equal(1)
    expect(order.moments[0]._id.toString()).to.equal(momentId.toString())
  })

  test('should not add a moment to an existing order when customer id is wrong', async () => {
    const customerId = Types.ObjectId('2cfc2370562b178fdfa1be91')
    const orderId = Types.ObjectId('9aaa2370562a178fdfa1ae99')
    const momentId = Types.ObjectId('4bbb2370562b178fdfa1be44')

    const order = await addMomentToOrder(customerId, orderId, momentId)

    expect(order).to.be.undefined
  })
})
