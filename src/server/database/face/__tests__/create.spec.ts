import { Types } from 'mongoose';
import { initDb, drop } from 'mongo-unit';
import { create } from '..';
import { sanitizeData } from '../../test-utils';

const testMongoUrl = process.env.DB_CONNECTION_STRING

describe('Create face tests', () => {
  let testData = require('./create.json')

  beforeEach(async () => {
    testData = sanitizeData(testData)
    await initDb(testMongoUrl, testData)
  })

  afterEach(async () => {
    await drop()
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

    expect(result.id).to.not.be.undefined
    expect(result.customerId.toString()).to.equal(face.customerId.toString())
  })
})
