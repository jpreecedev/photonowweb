import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'user_photos'] })
)

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login-failed' }),
  (req, res) => {
    res.redirect('/profile')
  }
)

export default router
