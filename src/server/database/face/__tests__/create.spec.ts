import { Types } from 'mongoose'
import { create } from '..'
import { sanitizeData } from '../../test-utils'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Create face tests', () => {
  let testData = require('./create.json')

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

  test('should create a new face', async () => {
    const face = {
      customerId: Types.ObjectId('1cfc2370562b178fdfa1be91'),
      filename: 'TEST FILE NAME.jpg',
      mimeType: 'application/test',
      bucket: 'TEST BUCKET NAME',
      contentType: 'image/test',
      location: 'TEST LOCATION',
      originalEtag: 'TEST ORIGINAL ETAG'
    }

    const result = await create(face)

    expect(result.id).not.toBeUndefined()
    expect(result.customerId.toString()).toEqual(face.customerId.toString())
  })
})
