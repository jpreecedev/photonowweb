import { errors } from '../utils'
import {
  getOrderForCustomer,
  userHasOrder,
  deleteOrderItem,
  createOrder,
  addMomentToOrder,
  orderHasMomentAdded
} from '../database/basket'

async function get(req, res) {
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

async function post(req, res) {
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

async function put(req, res) {
  try {
    const { _id } = req.user
    const { momentId } = req.body

    const order = await getOrderForCustomer(_id)
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    if (await orderHasMomentAdded(_id, order._id, momentId)) {
      return res.status(200).json(order)
    }

    const updatedOrder = await addMomentToOrder(_id, order._id, momentId)

    if (!updatedOrder) {
      return res.status(403).json({ error: 'Permission denied' })
    }

    return res.status(200).json(updatedOrder)
  } catch (e) {
    errors.handle(e)
    return res.status(500).send(e)
  }
}

async function deleteItem(req, res) {
  try {
    const { _id } = req.user
    const { orderId, momentId } = req.body

    if (!(await userHasOrder(_id, orderId))) {
      return res.status(500).send({ error: 'User does not have order' })
    }

    const updatedOrder = await deleteOrderItem(orderId, _id, momentId)

    return res.status(200).send(updatedOrder)
  } catch (e) {
    errors.handle(e)
    return res.status(500).send(e)
  }
}

export default { get, post, put, deleteItem }
