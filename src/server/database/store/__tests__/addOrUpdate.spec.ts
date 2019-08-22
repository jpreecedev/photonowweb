import { addOrUpdate } from '..'
import { sanitizeData } from '../../test-utils'
import { Types } from 'mongoose'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Add or update store tests', () => {
  const testData = require('./addOrUpdate.json')

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

  test('should create new store settings', async () => {
    const photographerId = Types.ObjectId('9bfc2370562b178fdfa1be99')

    const storeSettings = {
      singleImagePrice: 9834.44
    }

    let result = await addOrUpdate(photographerId, storeSettings)

    expect(result.photographerId).not.toBeUndefined()
    expect(result.photographerId.toString()).toEqual(photographerId.toString())

    expect(result.singleImagePrice).not.toBeUndefined()
    expect(result.singleImagePrice).toEqual(storeSettings.singleImagePrice)

    storeSettings.singleImagePrice = 4433.22
    result = await addOrUpdate(photographerId, storeSettings)
    expect(result.singleImagePrice).toEqual(storeSettings.singleImagePrice)
  })
})
