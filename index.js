/* eslint-disable no-process-exit */
/* eslint-disable no-undef */
const config = require('config');
const express = require('express');
const app = express();
require('express-async-errors');
// start application
require('./start/routes.js')(app);
require('./start/connectDb.js')();
// define port
const PORT = config.get('app.port') ? config.get('app.port') : 3000;

// error handling
process.on('unhandledRejection', reason => {
  console.error('FATAL ERROR: Unhandled Rejection:', reason);
  process.exit(1);
});
process.on('uncaughtException', error => {
  console.error('FATAL ERROR: Uncaught Exception:', error);
  process.exit(1);
});
// start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
