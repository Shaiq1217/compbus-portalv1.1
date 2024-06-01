const StatusCodes = require('http-status-codes');

function error(err, req, res, next) {
  if (err && err.details) {
    console.log(err.details[0].message);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: false, error: err.details[0].message });
  } else {
    // Other types of errors
    console.error('An unexpected error occurred.');
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error: 'An unexpected error occurred.' });
  }
}
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).send('Unauthorized');
  }
}
module.exports = { error, ensureAuthenticated };
