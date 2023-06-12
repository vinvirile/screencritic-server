const authRequired = (req, res, next) => {
  if (!req.user) {
    console.log('unauthorized use')
    return res.status(401)
  }
  next()
}

module.exports = { authRequired }
