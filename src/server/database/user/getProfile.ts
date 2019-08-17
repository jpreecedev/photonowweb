const { User } = require('../schema')

async function getProfile(id) {
  return await User.findOne({
    id
  })
    .select('profile')
    .exec()
}

module.exports = getProfile
