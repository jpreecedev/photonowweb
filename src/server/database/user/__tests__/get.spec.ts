const { expect } = require('chai')
const { initDb, drop } = require('mongo-unit')

const { getUser } = require('../../user')

const testMongoUrl = process.env.DB_CONNECTION_STRING

describe('Add or update user tests', () => {
  const testData = require('./get.json')

  beforeEach(async () => {
    await initDb(testMongoUrl, testData)
  })

  afterEach(async () => {
    await drop()
  })

  it('should get the specified user', async () => {
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

    expect(result.businessName).to.equal(user.businessName)
    expect(result.lat).to.equal(user.lat)
    expect(result.lng).to.equal(user.lng)
    expect(result.address).to.equal(user.address)
    expect(result.profile).to.not.be.undefined
    expect(result.profile.emailAddress).to.equal(user.profile.emailAddress)
    expect(result.profile.firstName).to.equal(user.profile.firstName)
    expect(result.profile.lastName).to.equal(user.profile.lastName)
    expect(result.profile.picture.url).to.equal(user.profile.picture.url)
    expect(result.provider).to.equal(user.provider)
  })
})
