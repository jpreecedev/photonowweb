const { Schema } = require('mongoose')

const FaceSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  mimeType: String,
  bucket: String,
  contentType: String,
  location: String,
  originalEtag: String
})

module.exports = { FaceSchema }
