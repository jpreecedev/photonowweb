import passport from 'passport'
import { Strategy } from 'passport-facebook'

import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, HOST, PORT } from '../config'
import { findOrCreate } from '../database/user'
import { User } from '../database/schema'

function authentication(app) {
  app.use(
    require('express-session')({
      secret: process.env.EXPRESS_SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { httpOnly: true, maxAge: 2419200000 }
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
        callbackURL: `${HOST}:${PORT}/api/auth/facebook/callback`,
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
