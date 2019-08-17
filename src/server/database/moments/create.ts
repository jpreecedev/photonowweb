import { Moment } from '../schema'

async function create(moment) {
  return await new Moment(moment).save()
}

export { create }
