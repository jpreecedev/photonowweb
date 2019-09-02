import { Response } from 'express'
import { Types } from 'mongoose'
import { errors } from '../utils'
import { getOrder } from '../database/order'

async function get(req: RequestWithOrder, res: Response) {
  try {
    const { orderId } = req.params

    const order = await getOrder(Types.ObjectId(orderId))
    return res.status(200).json(order)
  } catch (e) {
    errors.handle(e)

    return res.status(500).send(e)
  }
}

export default { get }
