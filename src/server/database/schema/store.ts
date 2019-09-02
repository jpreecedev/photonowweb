import { model, Model, Schema, Types } from 'mongoose'

const StoreSchema = new Schema({
  photographerId: { type: Types.ObjectId, ref: 'User' },
  singleImagePrice: Number
})

const Store: Model<IStore> = model<IStore>('Store', StoreSchema)

export { Store }
