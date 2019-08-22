import { updateProfile } from '../../user'
import { sanitizeData } from '../../test-utils'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Update user profile tests', () => {
  const testData = require('./updateProfile.json')

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

  test('should update the user profile', async () => {
    const id = testData.users[0].id
    const profile = {
      emailAddress: 'jazz@jazz.com',
      firstName: 'First Name',
      lastName: 'Last Name',
      picture: {
        url: '/some/new/img.png'
      }
    }

    const result = await updateProfile(id, profile)

    expect(result.profile).not.toBeUndefined()
    expect(result.profile.emailAddress).toEqual(profile.emailAddress)
    expect(result.profile.firstName).toEqual(profile.firstName)
    expect(result.profile.lastName).toEqual(profile.lastName)
    expect(result.profile.picture.url).toEqual(profile.picture.url)
  })
})
