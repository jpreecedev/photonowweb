const { User } = require('../schema')

async function getUser(id) {
  return await User.findOne({
    id
  }).exec()
}

module.exports = { getUser }
