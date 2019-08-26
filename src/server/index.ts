import path from 'path'
import * as express from 'express'
import cors from 'cors'
import chalk from 'chalk'
import manifestHelpers from 'express-manifest-helpers'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import router from './router'
import paths from '../../config/paths'
import errorHandler from './middleware/errorHandler'
import serverRenderer from './middleware/serverRenderer'
import { connectToDatabase } from './database/connection'
import { authenticationMiddleware } from './strategies'

require('dotenv').config()

const app = express.default()

// Use Nginx or Apache to serve static assets in production or remove the if() around the following
// lines to use the express.static middleware to serve assets for production (not recommended!)
if (process.env.NODE_ENV === 'development') {
  app.use(
    paths.publicPath,
    express.static(path.join(paths.clientBuild, paths.publicPath))
  )
}

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

authenticationMiddleware(app)
router(app)

const manifestPath = path.join(paths.clientBuild, paths.publicPath)

app.use(
  manifestHelpers({
    manifestPath: `${manifestPath}/manifest.json`
  })
)

app.use(serverRenderer())

app.use(errorHandler)
;(async () => {
  await connectToDatabase()
})()

app.listen(process.env.PORT || 8500, () => {
  //eslint-disable-next-line
  console.log(
    `[${new Date().toISOString()}]`,
    chalk.blue(`App is running: http://localhost:${process.env.PORT || 8500}`)
  )
})

export default app
