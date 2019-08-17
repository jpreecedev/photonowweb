import { Face } from '../schema'

async function create(face) {
  return await new Face(face).save()
}

export { create }
