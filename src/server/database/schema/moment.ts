import { model, Model, Schema, Types } from 'mongoose'

const MomentSchema = new Schema({
  photographerId: { type: Types.ObjectId, ref: 'User' },
  filename: String,
  mimeType: String,
  bucket: String,
  contentType: String,
  location: String,
  originalEtag: String,
  resizedLocation: String,
  resizedEtag: String,
  amount: Number // Calculated field and almost certainly wrong!
})

const Moment: Model<IMoment> = model<IMoment>('Moment', MomentSchema)

export { Moment }
