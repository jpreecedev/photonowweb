import express from 'express'
import { OrdersController } from '../controllers'
import { authorisation } from '../utils'

const router = express.Router()

router.get('/:orderId', authorisation.basic, OrdersController.get)

export default router
