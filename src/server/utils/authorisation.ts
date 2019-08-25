const basic = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.redirect('/login')
}

export default {
  basic
}
