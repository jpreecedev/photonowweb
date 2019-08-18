import momentsRouter from './moments.routes'
import usersRouter from './users.routes'
import storeRoutes from './store.routes'
import paymentRoutes from './payment.routes'
import basketRoutes from './basket.routes'
import ordersRoutes from './orders.routes'
import faceRoutes from './face.routes'

const BASE_API_URL = '/api'

function Router(app) {
  app.use(`${BASE_API_URL}/moments`, momentsRouter)
  app.use(`${BASE_API_URL}/users`, usersRouter)
  app.use(`${BASE_API_URL}/store`, storeRoutes)
  app.use(`${BASE_API_URL}/payment`, paymentRoutes)
  app.use(`${BASE_API_URL}/basket`, basketRoutes)
  app.use(`${BASE_API_URL}/orders`, ordersRoutes)
  app.use(`${BASE_API_URL}/face`, faceRoutes)
}

export default Router