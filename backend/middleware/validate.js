/* eslint-disable consistent-return */
const statusCodes = require('http-status-codes');

class Middleware {
  body(req, res, next, schema) {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(statusCodes.StatusCodes.BAD_REQUEST).json({ status: false, message: error.details[0].message });
    }
    next();
  }

  params(req, res, next, schema) {
    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(statusCodes.StatusCodes.BAD_REQUEST).json({ status: false, message: error.details[0].message });
    }
    next();
  }
}

const middleware = new Middleware();
module.exports = middleware;
