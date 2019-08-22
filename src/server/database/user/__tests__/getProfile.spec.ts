import { getProfile } from '../../user'
import { sanitizeData } from '../../test-utils'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Get user profile tests', () => {
  const testData = require('./getProfile.json')

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

  test('should get the specified user profile', async () => {
    const id = testData.users[0].id
    const user = {
      emailAddress: testData.users[0].profile.emailAddress,
      firstName: testData.users[0].profile.firstName,
      lastName: testData.users[0].profile.lastName,
      pictureUrl: testData.users[0].profile.picture.url
    }

    const { profile } = await getProfile(id)

    expect(profile).not.toBeUndefined()
    expect(profile.emailAddress).toEqual(user.emailAddress)
    expect(profile.firstName).toEqual(user.firstName)
    expect(profile.lastName).toEqual(user.lastName)
    expect(profile.picture.url).toEqual(user.pictureUrl)
  })
})
