// import { User, Moment, Order } from './database/schema'

// import mongoose from 'mongoose'
// const { Types } = mongoose

// mongoose.connect('mongodb://root:example@localhost:27017/test?authSource=admin&w=1', {
//   useNewUrlParser: true
// })

// User.deleteMany({}).then((err, res) => console.log(err))

// User.find({}).exec((err, users) => {
//   users.forEach(u => console.log(u))
// })

// Moment.deleteMany({}).then((err, res) => console.log(err))

// Moment.find({}).exec((err, moments) => {
//   moments.forEach(u => console.log(u))
//   process.exit(0)
// })

// Order.find({}).exec((err, orders) => {
//   orders.forEach(u => console.log(u))
//   process.exit(0)
// })

// Order.findOne({ customerId: Types.ObjectId('5d3c3e6d438835640d81bd12') })
//   .populate({
//     path: 'moments',
//     select: ['filename', 'resizedLocation', 'mimeType', 'price']
//   })
//   .exec((err, orders) => {
//     console.log(orders)

//     process.exit(0)
//   })

// Order.deleteMany({}).exec((err, orders) => {
//   process.exit(0)
// })

// User.find({}).exec((err, users) => {
//   console.log(users)
//   process.exit(0)
// })

// User.findOne({
//   id: '2038428602910050'
// })
//   .select('profile')
//   .exec((err, users) => console.log(users))
