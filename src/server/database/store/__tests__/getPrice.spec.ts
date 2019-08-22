import { sanitizeData } from '../../test-utils'
import { getPrice } from '../../store'
import { Types } from 'mongoose'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Get Price tests', () => {
  let testData = require('./getPrice.json')

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

  test('should get the price for an existing store', async () => {
    const photographerId = Types.ObjectId('9bfc2370562b178fdfa1be99')

    const singleImagePrice = await getPrice(photographerId)

    expect(singleImagePrice).not.toBeUndefined()
    expect(singleImagePrice).toEqual(testData.stores[0].singleImagePrice)
  })
})
