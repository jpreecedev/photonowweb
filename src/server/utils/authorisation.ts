import passport from 'passport'

const basic = () => passport.authenticate('facebook', { session: false })

export default {
  basic
}
