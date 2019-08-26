import passport from 'passport'
import { Strategy } from 'passport-facebook'

import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_CALLBACK_URL } from '../config'
import { findOrCreate } from '../database/user'

function initialise() {
  passport.use(
    new Strategy(
      {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'displayName', 'email']
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

export { initialise }
