import { errors } from '../utils'
import { getOrder, getOrders } from '../database/orders'

async function get(req, res) {
  try {
    const { _id } = req.user
    const { orderId } = req.params

    if (orderId) {
      const order = await getOrder(_id, orderId)
      return res.status(200).json(order)
    }

    const orders = await getOrders(_id)
    return res.status(200).json(orders)
  } catch (e) {
    errors.handle(e)

    return res.status(500).send(e)
  }
}

export default { get }
