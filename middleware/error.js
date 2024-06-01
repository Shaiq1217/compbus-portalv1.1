const statusCodes = require('http-status-codes');

function error(err, req, res) {
  if (err && err.details) {
    console.log(err.details[0].message);
    return res
      .status(statusCodes.StatusCodes.BAD_REQUEST)
      .json({ status: false, error: err.details[0].message });
  } else {
    // Other types of errors
    console.error('An unexpected error occurred.');
    console.log(err);
    return res
      .status(statusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error: 'An unexpected error occurred.' });
  }
}

module.exports = { error };
