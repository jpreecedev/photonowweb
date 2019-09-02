import { Types } from 'mongoose'
import { sanitizeData } from '../../test-utils'
import TestDbHelper from '../../../../../config/jest/mongo-setup'
import { calculateOrderAmount } from '../utils'
import { getMoments } from 'database/moments'

const dbHelper = new TestDbHelper()

describe('Get order tests', () => {
  let testData = require('./get.json')

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

  test('should calculate the correct order amount', async () => {
    const momentIds = [
      Types.ObjectId('9ccc2370562b178fdfa1be11'),
      Types.ObjectId('4ccc2370562b178fdfa1be11')
    ]
    const moments = await getMoments(momentIds)

    const amount = await calculateOrderAmount(moments)

    expect(amount).toEqual(524)
  })
})
