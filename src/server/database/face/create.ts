const { Face } = require('../schema')

async function create(face) {
  return await new Face(face).save()
}

module.exports = { create }
