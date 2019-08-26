import passport from 'passport'
import session from 'express-session'
import { Express } from 'express'

import { User } from '../database/schema'
import { initialise as initialiseFacebook } from './facebook'
import { initialise as initialiseLocal } from './local'

function authenticationMiddleware(app: Express) {
  const MongoDBStore = require('connect-mongodb-session')(session)
  const store = new MongoDBStore({
    uri: process.env.DB_CONNECTION_STRING,
    collection: 'sessions'
  })

  store.on('error', function(error) {
    console.log(error)
  })

  app.use(
    require('express-session')({
      secret: process.env.EXPRESS_SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      store,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      }
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  initialiseFacebook()
  initialiseLocal()
}

export { authenticationMiddleware }
