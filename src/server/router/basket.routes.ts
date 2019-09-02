import express from 'express'
import { BasketController } from '../controllers'
import { authorisation } from '../utils'

const router = express.Router()

router.get('/', authorisation.basic, BasketController.get)
router.post('/', authorisation.basic, BasketController.post)
router.put('/', authorisation.basic, BasketController.put)

export default router
