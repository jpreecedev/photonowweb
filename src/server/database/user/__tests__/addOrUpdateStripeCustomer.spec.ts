import { Types } from 'mongoose'
import { sanitizeData } from '../../test-utils'
import { addOrUpdateStripeCustomer } from '../../user'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Stripe token tests', () => {
  const testData = require('./addOrUpdateStripeCustomer.json')

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

  test('should update the stripe token', async () => {
    const id = Types.ObjectId(testData.users[0]._id)
    const stripeCustomerId = '123ABC'

    const result = await addOrUpdateStripeCustomer(id, stripeCustomerId)

    expect(result).not.toBeUndefined()
    expect(result.stripeCustomerId).not.toBeUndefined()
    expect(result.stripeCustomerId).toEqual(stripeCustomerId)
  })
})
