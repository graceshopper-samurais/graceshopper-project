function isAdmin(req, res, next) {
  console.log('this is req.use------', req.user)
  if (typeof req.user === 'undefined' || !req.user.admin) {
    const err = new Error('Admin only')
    err.status = 401
    next(err)
  } else {
    next()
  }
}

function isCorrectUser(req, res, next) {
  if (
    typeof req.user === 'undefined' ||
    req.user.id !== parseInt(req.params.id)
  ) {
    const err = new Error('Incorrect user')
    err.status = 401
    next(err)
  } else {
    next()
  }
}

module.exports = {
  isAdmin,
  isCorrectUser
}
