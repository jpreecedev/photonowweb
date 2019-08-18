import { initDb, drop } from 'mongo-unit'
import { Types } from 'mongoose'
import { sanitizeData } from '../../test-utils'
import { getOrderForCustomer, userHasOrder, orderHasMomentAdded } from '..'

const testMongoUrl = process.env.DB_CONNECTION_STRING

describe('Get order tests', () => {
  let testData = require('./get.json')

  beforeEach(async () => {
    testData = sanitizeData(testData)
    await initDb(testMongoUrl, testData)
  })

  afterEach(async () => {
    await drop()
  })

  test('should get the order', async () => {
    const customerId = Types.ObjectId('1cfc2370562b178fdfa1be91')

    const order = await getOrderForCustomer(customerId)

    expect(order).not.to.be.undefined
    expect(order.customerId.toString()).to.equal(customerId.toString())
    expect(order.moments.length).to.equal(1)
    expect(order.moments[0]._id.toString()).to.equal(
      testData.orders[0].moments[0].toString()
    )
    expect(order.amount).to.equal(testData.orders[0].amount)
  })

  test('should verify that the user can access the order', async () => {
    const customerId = Types.ObjectId('1cfc2370562b178fdfa1be91')
    const orderId = Types.ObjectId('9aaa2370562a178fdfa1ae99')

    const hasOrder = await userHasOrder(customerId, orderId)

    expect(hasOrder).to.be.true
  })

  test('should verify that the user cannot access the order', async () => {
    const customerId = Types.ObjectId('1dfc2370562b178fdfa1be91')
    const orderId = Types.ObjectId('9aaa2370562a178fdfa1ae99')

    const hasOrder = await userHasOrder(customerId, orderId)

    expect(hasOrder).to.be.false
  })

  test('should verify that the moment has not already been added to the order', async () => {
    const customerId = Types.ObjectId('1cfc2370562b178fdfa1be91')
    const orderId = Types.ObjectId('9aaa2370562a178fdfa1ae99')
    const momentId = Types.ObjectId('9ddd2370562b178fdfa1be11')

    const hasBeenAdded = await orderHasMomentAdded(customerId, orderId, momentId)

    expect(hasBeenAdded).to.be.false
  })

  test('should verify that the moment has already been added to the order', async () => {
    const customerId = Types.ObjectId('1cfc2370562b178fdfa1be91')
    const orderId = Types.ObjectId('9aaa2370562a178fdfa1ae99')
    const momentId = Types.ObjectId('9ccc2370562b178fdfa1be11')

    const hasBeenAdded = await orderHasMomentAdded(customerId, orderId, momentId)

    expect(hasBeenAdded).to.be.true
  })

  test('should verify that the order is verified before checking if moment has been added', async () => {
    const customerId = Types.ObjectId('2cfc2370562b178fdfa1be91')
    const orderId = Types.ObjectId('9aaa2370562a178fdfa1ae99')
    const momentId = Types.ObjectId('9ccc2370562b178fdfa1be11')

    const hasBeenAdded = await orderHasMomentAdded(customerId, orderId, momentId)

    expect(hasBeenAdded).to.be.false
  })
})
