import { initDb, drop } from 'mongo-unit';
import { Types } from 'mongoose';
import { sanitizeData } from '../../test-utils';
import { getOrder, getOrders } from '..';

const testMongoUrl = process.env.DB_CONNECTION_STRING

describe('Get order tests', () => {
  beforeEach(async () => {
    const testData = require('./get-order.json')
    await initDb(testMongoUrl, sanitizeData(testData))
  })

  afterEach(async () => {
    await drop()
  })

  test('should get the order when order id is supplied', async () => {
    const orderId = Types.ObjectId('9aaa2370562a178fdfa1ae99')
    const customerId = Types.ObjectId('1cfc2370562b178fdfa1be91')

    const order = await getOrder(customerId, orderId)

    expect(order).not.to.be.undefined
    expect(order._id.toString()).to.equal(orderId.toString())
  })

  test('should get all the orders for the given customer', async () => {
    const customerId = Types.ObjectId('5cfc2370562b178fdfa1be91')

    const orders = await getOrders(customerId)

    expect(orders).not.to.be.undefined
    expect(orders.length).to.equal(2)
    expect(orders[0]._id.toString()).to.equal('9ddd2370562d178fdfd1de99')
    expect(orders[1]._id.toString()).to.equal('9eee2370562d178fdfd1de99')
  })
})
