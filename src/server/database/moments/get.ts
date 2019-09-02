import { Types } from 'mongoose'
import { Moment } from '../schema'

async function getMoment(id: Types.ObjectId) {
  return await Moment.findById(id).exec()
}

async function getMoments(ids: Types.ObjectId[]) {
  return await Moment.find({
    _id: {
      $in: ids
    }
  }).exec()
}

export { getMoment, getMoments }
