const { Payment } = require('../schema')

const defaultFields = ['orderId', 'customerId', 'receipt', 'amount', 'moments']

async function getPayment(id) {
  return await Payment.findById(id)
    .select(defaultFields)
    .exec()
}

module.exports = { getPayment }
