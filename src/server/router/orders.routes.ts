import express from 'express';
import { OrdersController } from '../controllers';
import { authorisation } from '../utils';

const router = express.Router()

router.get('/:orderId?', authorisation.jwt(), OrdersController.get)

export default router;
