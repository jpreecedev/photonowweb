const { Moment } = require('../schema')

async function create(moment) {
  return await new Moment(moment).save()
}

module.exports = { create }
