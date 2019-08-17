const { Types } = require('mongoose')

function sanitizeData(testData) {
  if (testData.orders && testData.orders.length) {
    testData.orders.forEach(order => {
      order._id = Types.ObjectId(order._id)
      order.customerId = Types.ObjectId(order.customerId)
      if (order.moments) {
        order.moments.forEach(moment => {
          moment._id = Types.ObjectId(moment._id)
        })
      }
    })
  }
  if (testData.moments && testData.moments.length) {
    testData.moments.forEach(moment => {
      moment._id = Types.ObjectId(moment._id)
      moment._photographerId = Types.ObjectId(moment._photographerId)
    })
  }
  if (testData.stores && testData.stores.length) {
    testData.stores.forEach(store => {
      store.photographerId = Types.ObjectId(store.photographerId)
    })
  }
  if (testData.payments && testData.payments.length) {
    testData.payments.forEach(payment => {
      payment._id = Types.ObjectId(payment._id)
      payment.customerId = Types.ObjectId(payment.customerId)
      payment.photographerId = Types.ObjectId(payment.photographerId)
    })
  }
  return testData
}

module.exports = { sanitizeData }
