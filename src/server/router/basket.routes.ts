import express from 'express';
import { BasketController } from '../controllers';
import { authorisation } from '../utils';

const router = express.Router()

router.get('/', authorisation.jwt(), BasketController.get)
router.post('/', authorisation.jwt(), BasketController.post)
router.put('/', authorisation.jwt(), BasketController.put)
router.delete('/', authorisation.jwt(), BasketController.deleteItem)

export default router;
