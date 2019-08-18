import express from 'express';
import { UsersController } from '../controllers';
import { authorisation } from '../utils';

const router = express.Router()

router.post('/', authorisation.jwt(), UsersController.post)
router.post('/token', UsersController.generateToken)
router.get('/:id', authorisation.jwt(), UsersController.get)

export default router;
