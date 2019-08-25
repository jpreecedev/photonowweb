import passport from 'passport'
import { Strategy } from 'passport-facebook'

import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, HOST, PORT } from '../config'
import { findOrCreate } from '../database/user'
import { User } from '../database/schema'

import session from 'express-session'

const MongoDBStore = require('connect-mongodb-session')(session)

function authentication(app) {
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

  passport.use(
    new Strategy(
      {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: `https://25cb469d.ngrok.io/api/auth/facebook/callback`,
        profileFields: ['id', 'displayName', 'photos', 'email']
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: Function
      ) => {
        const user = await findOrCreate(profile, accessToken, refreshToken)
        if (!user) {
          return done('Unable to find or create user')
        }
        return done(null, user)
      }
    )
  )
}

export { authentication }
