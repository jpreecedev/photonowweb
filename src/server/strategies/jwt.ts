import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

import { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } from '../config'
import { getUser } from '../database/user'

function initialise() {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE
  }

  passport.use(
    new Strategy(options, async (jwt_payload, done) => {
      await getUser({ id: jwt_payload.sub })
    })
  )
}

export { initialise }
