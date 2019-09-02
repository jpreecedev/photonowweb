import { model, Model, Schema } from 'mongoose'

const StoreSchema = new Schema({
  photographerId: { type: Schema.Types.ObjectId, ref: 'User' },
  singleImagePrice: Number
})

const Store: Model<IStore> = model<IStore>('Store', StoreSchema)

export { Store }
