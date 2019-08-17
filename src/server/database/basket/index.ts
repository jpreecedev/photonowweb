import { getOrderForCustomer, userHasOrder, orderHasMomentAdded } from './get';
import { deleteOrderItem } from './delete';
import { createOrder } from './create';
import { addMomentToOrder } from './update';

export default {
  getOrderForCustomer,
  userHasOrder,
  deleteOrderItem,
  createOrder,
  addMomentToOrder,
  orderHasMomentAdded
};
