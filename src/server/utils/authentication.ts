import passport from 'passport'
import { FacebookStrategy } from 'passport-facebook'

import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, HOST, PORT } from '../config'
import { findOrCreate } from '../database/user'

function authentication(app) {
  app.use(passport.initialize())

  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: `${HOST}:${PORT}/auth/facebook/callback`
      },
      async (accessToken: string, refreshToken: string, profile: Profile) => {
        return await findOrCreate(profile, accessToken, refreshToken)
      }
    )
  )
}

export default { authentication }
