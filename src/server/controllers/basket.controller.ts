import { Response } from 'express'
import { errors } from '../utils'
import {
  getOrderForCustomer,
  createOrder,
} from '../database/basket'

async function get(req: RequestWithUser, res: Response) {
  try {
    const { _id } = req.user

    let order = await getOrderForCustomer(_id)

    if (!order) {
      order = await createOrder(_id)
    }

    return res.status(200).json(order)
  } catch (e) {
    errors.handle(e)

    return res.status(500).send(e)
  }
}

async function post(req: RequestWithUser, res: Response) {
  try {
    const { _id } = req.user

    let order = await getOrderForCustomer(_id)
    if (order) {
      return res.status(400).send({ error: 'Order already exists' })
    }

    order = await createOrder(_id)

    return res.status(200).json(order)
  } catch (e) {
    errors.handle(e)
    return res.status(500).send(e)
  }
}

export default { get, post, put }
