const express = require('express');
const passport = require('passport');
const session = require('express-session');

// google authentication
require('../middleware/oauth.js');

// Routes
const product = require('../routes/Product.js');
const category = require('../routes/Category.js');
const order = require('../routes/Order.js');
const { error } = require('../middleware/error.js');


module.exports = function (app) {
  app.use(express.json());

  // Configure express-session
  app.use(session({
    secret: 'cats', // Temporary key for testing
    resave: false,
    saveUninitialized: true
  }));

  // Initialize Passport and restore authentication state, if any, from the session.
  app.use(passport.initialize());
  app.use(passport.session());


  // Define Routes
  app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Login with Google</a>');
  });

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/api/product',
    failureRedirect: '/auth/failure'
  }));

  app.get('/auth/failure', (req, res) => {
    res.send('Failed to authenticate..');
  });

  app.use('/api/category', category);
  app.use('/api/product', product);
  app.use('/api/order', order);
  app.use(error);
};
