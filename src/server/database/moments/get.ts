import { Types } from 'mongoose'
import { Moment } from '../schema'

async function getMoment(id: Types.ObjectId) {
  return await Moment.findById(id).exec()
}

export { getMoment }
