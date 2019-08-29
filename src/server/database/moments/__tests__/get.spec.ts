import { getMoment } from '../get'
import { sanitizeData } from '../../test-utils'
import { Types } from 'mongoose'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Get moment tests', () => {
  const testData = require('./get.json')

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

  test('should get the specified moment', async () => {
    const moment = {
      _id: testData.moments[0]._id,
      photographerId: Types.ObjectId(testData.moments[0].photographerId),
      filename: testData.moments[0].filename,
      resizedLocation: testData.moments[0].resizedLocation,
      mimeType: testData.moments[0].mimeType
    }

    const result = await getMoment(testData.moments[0]._id)

    expect(result._id).toEqual(moment._id)
    expect(result.photographerId).toEqual(moment.photographerId)
    expect(result.filename).toEqual(moment.filename)
    expect(result.resizedLocation).toEqual(moment.resizedLocation)
    expect(result.mimeType).toEqual(moment.mimeType)
  })
})
