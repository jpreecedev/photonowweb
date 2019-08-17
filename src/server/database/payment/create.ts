import { Payment } from '../schema'

async function create(payment) {
  const result = await new Payment(payment).save()
  return result !== undefined && result !== null
}

export { create }
