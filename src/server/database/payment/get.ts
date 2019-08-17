import { Payment } from '../schema'

const defaultFields = ['orderId', 'customerId', 'receipt', 'amount', 'moments']

async function getPayment(id) {
  return await Payment.findById(id)
    .select(defaultFields)
    .exec()
}

export { getPayment }
