import express from 'express'
import { UsersController } from '../controllers'
import { authorisation } from '../utils'

const router = express.Router()

router.post('/', authorisation.basic, UsersController.post)
router.get('/:id', authorisation.basic, UsersController.get)

export default router
