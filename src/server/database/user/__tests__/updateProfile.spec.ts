const { expect } = require('chai')
const { initDb, drop } = require('mongo-unit')

const { updateProfile } = require('../../user')

const testMongoUrl = process.env.DB_CONNECTION_STRING

describe('Update user profile tests', () => {
  const testData = require('./updateProfile.json')

  beforeEach(async () => {
    await initDb(testMongoUrl, testData)
  })

  afterEach(async () => {
    await drop()
  })

  it('should update the user profile', async () => {
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

    expect(result.profile).to.not.be.undefined
    expect(result.profile.emailAddress).to.equal(profile.emailAddress)
    expect(result.profile.firstName).to.equal(profile.firstName)
    expect(result.profile.lastName).to.equal(profile.lastName)
    expect(result.profile.picture.url).to.equal(profile.picture.url)
  })
})
