const { model } = require('mongoose')

const { UserSchema } = require('./user')
const { MomentSchema } = require('./moment')
const { FaceSchema } = require('./face')
const { StoreSchema } = require('./store')
const { OrderSchema } = require('./order')
const { PaymentSchema } = require('./payment')

const User = model('User', UserSchema)
const Moment = model('Moment', MomentSchema)
const Store = model('Store', StoreSchema)
const Order = model('Order', OrderSchema)
const Payment = model('Payment', PaymentSchema)
const Face = model('Face', FaceSchema)

module.exports = { User, Moment, Store, Order, Payment, Face }
