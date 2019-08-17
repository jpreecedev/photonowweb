const { expect } = require('chai')
const { initDb, drop } = require('mongo-unit')

const { create } = require('..')

const testMongoUrl = process.env.DB_CONNECTION_STRING

describe('Create moment tests', () => {
  beforeEach(async () => {
    const testData = require('./create.json')
    await initDb(testMongoUrl, testData)
  })

  afterEach(async () => {
    await drop()
  })

  it('should create a new moment', async () => {
    const newMoment = {
      filename: 'TEST FILE NAME.jpg',
      mimeType: 'application/test',
      bucket: 'TEST BUCKET NAME',
      contentType: 'image/test',
      location: 'TEST LOCATION',
      originalEtag: 'TEST ORIGINAL ETAG',
      resizedLocation: 'RESIZED LOCATION',
      resizedEtag: 'TEST RESIZED ETAG'
    }

    const result = await create(newMoment)

    expect(result.id).to.not.be.undefined
  })
})
