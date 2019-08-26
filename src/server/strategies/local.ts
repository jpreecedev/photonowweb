import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'

const BCRYPT_SALT_ROUNDS = 12

import { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } from '../config'
import { getUserBy, create } from '../database/user'

function initialise() {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE
  }

  passport.use(
    'register',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false
      },
      async (username, password, done) => {
        try {
          const user = await getUserBy({ username })
          if (user) {
            return done(null, false, { message: 'Username is already taken' })
          }

          const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
          const newUser = await create({ username, password: hashedPassword })
          done(null, newUser)
        } catch (error) {
          done(error)
        }
      }
    )
  )

  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false
      },
      async (username: string, password: string, done: Function) => {
        try {
          console.log(password, username)
          const user = await getUserBy({ username })
          if (!user) {
            return done(null, false, { message: 'Invalid login credentials' })
          }

          const result = await bcrypt.compare(password, user.password)
          if (result !== true) {
            return done(null, false, { message: 'Invalid login credentials' })
          }

          return done(null, user)
        } catch (error) {
          done(error)
        }
      }
    )
  )

  passport.use(
    'jwt',
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await getUserBy({ username: payload.id })
        if (user) {
          done(null, user)
          return
        }
        done(null, false)
      } catch (error) {
        done(error)
      }
    })
  )
}

export { initialise }
