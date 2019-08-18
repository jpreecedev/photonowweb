import { model } from 'mongoose'
import { User } from './user'
import { MomentSchema } from './moment'
import { FaceSchema } from './face'
import { StoreSchema } from './store'
import { OrderSchema } from './order'
import { PaymentSchema } from './payment'

const Moment = model('Moment', MomentSchema)
const Store = model('Store', StoreSchema)
const Order = model('Order', OrderSchema)
const Payment = model('Payment', PaymentSchema)
const Face = model('Face', FaceSchema)

export { User, Moment, Store, Order, Payment, Face }