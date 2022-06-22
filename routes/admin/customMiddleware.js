// Requiring the Validate Package from Express
const { validationResult } = require('express-validator')

module.exports = {
  handleErrors(templateFunc, dataCallback) {
    return async (req, res, next) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        let data = {}
        if (dataCallback) {
          data = await dataCallback(req)
        }

        return res.send(templateFunc({ errors, ...data }))
      }

      next()
    }
  },

  requireAuth(req, res, next) {
    if (!req.session.userID) {
      return res.redirect('/login')
    }

    next()
  }
}