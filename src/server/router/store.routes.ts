import express from 'express'
import { StoreController } from '../controllers'
import { authorisation } from '../utils'

const router = express.Router()

router.post('/', authorisation.basic(), StoreController.post)

export default router
