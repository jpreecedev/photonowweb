import passport from 'passport'
import passportJWT from 'passport-jwt'

const JWTStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt

import { JWT_SECRET } from '../config'
import { getUser } from '../database/user'

function authentication(app) {
  app.use(passport.initialize())

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET
      },
      async (jwtPayload, done) => {
        try {
          const user = await getUser(jwtPayload.id)
          return done(null, user)
        } catch (ex) {
          return done(ex, null)
        }
      }
    )
  )
}

export default { authentication }
