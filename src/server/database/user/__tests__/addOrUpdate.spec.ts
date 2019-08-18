import { initDb, drop } from 'mongo-unit'
import { addOrUpdate } from '..'

const testMongoUrl = process.env.DB_CONNECTION_STRING

describe('Add or update user tests', () => {
  const testData = require('./addOrUpdate.json')

  beforeEach(async () => {
    await initDb(testMongoUrl, testData)
  })

  afterEach(async () => {
    await drop()
  })

  test('should create a new user then update it', async () => {
    const user = {
      id: 'identityId',
      provider: 'providerName',
      businessName: 'test business name'
    }

    let result = await addOrUpdate(user)

    expect(result.id).to.not.be.undefined
    expect(result.id).to.equal(user.id)

    user.businessName = 'different business name'

    result = await addOrUpdate(user)

    expect(result.businessName).to.equal(user.businessName)
  })
})
