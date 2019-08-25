import { model } from 'mongoose'
import { User } from './user'
import { MomentSchema } from './moment'
import { StoreSchema } from './store'
import { OrderSchema } from './order'
import { PaymentSchema } from './payment'

const Moment = model('Moment', MomentSchema)
const Store = model('Store', StoreSchema)
const Order = model('Order', OrderSchema)
const Payment = model('Payment', PaymentSchema)

export { User, Moment, Store, Order, Payment }
