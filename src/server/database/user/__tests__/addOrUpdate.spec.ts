import { sanitizeData } from '../../test-utils'
import { addOrUpdate } from '..'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Add or update user tests', () => {
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

  test('should create a new user then update it', async () => {
    const user = {
      id: 'identityId',
      provider: 'providerName',
      businessName: 'test business name'
    }

    let result = await addOrUpdate(user)

    expect(result.id).not.toBeUndefined()
    expect(result.id).toEqual(user.id)

    user.businessName = 'different business name'

    result = await addOrUpdate(user)

    expect(result.businessName).toEqual(user.businessName)
  })
})
