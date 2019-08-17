const { Schema } = require('mongoose')

const StoreSchema = new Schema({
  photographerId: { type: Schema.Types.ObjectId, ref: 'User' },
  singleImagePrice: Number
})

module.exports = { StoreSchema }
