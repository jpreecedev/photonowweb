import express, { Response } from 'express'
import passport from 'passport'

const router = express.Router()

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'user_photos'] })
)

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login-failed' }),
  (req: RequestWithUser, res: Response) => {
    if (req.user.selectedPhoto) {
      return res.redirect('/profile')
    }

    return res.redirect('/setup')
  }
)

export default router
