const { expect } = require('chai')
const { initDb, drop } = require('mongo-unit')

const { getProfile } = require('../../user')

const testMongoUrl = process.env.DB_CONNECTION_STRING

describe('Get user profile tests', () => {
  const testData = require('./getProfile.json')

  beforeEach(async () => {
    await initDb(testMongoUrl, testData)
  })

  afterEach(async () => {
    await drop()
  })

  it('should get the specified user profile', async () => {
    const id = testData.users[0].id
    const user = {
      emailAddress: testData.users[0].profile.emailAddress,
      firstName: testData.users[0].profile.firstName,
      lastName: testData.users[0].profile.lastName,
      pictureUrl: testData.users[0].profile.picture.url
    }

    const { profile } = await getProfile(id)

    expect(profile).to.not.be.undefined
    expect(profile.emailAddress).to.equal(user.emailAddress)
    expect(profile.firstName).to.equal(user.firstName)
    expect(profile.lastName).to.equal(user.lastName)
    expect(profile.picture.url).to.equal(user.pictureUrl)
  })
})
