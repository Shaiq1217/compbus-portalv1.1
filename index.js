/* eslint-disable no-process-exit */
/* eslint-disable no-undef */
const config = require('config');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('./middleware/oauth.js'); // Ensure this path is correct

const app = express();
require('express-async-errors');

// Middleware for parsing JSON bodies
app.use(express.json());

// Configure express-session
app.use(session({
  secret: 'yourSecretKey', // Replace with your own secret
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// Import and initialize routes
require('./start/routes.js')(app);
require('./start/connectDb.js')(); // Ensure this connects to your database

// Define port
const PORT = config.get('app.port') || 3000;

// Error handling
process.on('unhandledRejection', reason => {
  console.error('FATAL ERROR: Unhandled Rejection:', reason);
  process.exit(1);
});
process.on('uncaughtException', error => {
  console.error('FATAL ERROR: Uncaught Exception:', error);
  process.exit(1);
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
