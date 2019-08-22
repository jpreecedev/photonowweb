import { getUser } from '../../user'
import { sanitizeData } from '../../test-utils'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Add or update user tests', () => {
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

  test('should get the specified user', async () => {
    const id = testData.users[0].id
    const user = {
      businessName: testData.users[0].businessName,
      lat: testData.users[0].lat,
      lng: testData.users[0].lng,
      address: testData.users[0].address,
      profile: testData.users[0].profile,
      provider: testData.users[0].provider
    }

    const result = await getUser(id)

    expect(result.businessName).toEqual(user.businessName)
    expect(result.lat).toEqual(user.lat)
    expect(result.lng).toEqual(user.lng)
    expect(result.address).toEqual(user.address)
    expect(result.profile).not.toBeUndefined()
    expect(result.profile.emailAddress).toEqual(user.profile.emailAddress)
    expect(result.profile.firstName).toEqual(user.profile.firstName)
    expect(result.profile.lastName).toEqual(user.profile.lastName)
    expect(result.profile.picture.url).toEqual(user.profile.picture.url)
    expect(result.provider).toEqual(user.provider)
  })
})
