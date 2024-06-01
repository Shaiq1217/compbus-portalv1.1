const express = require('express');
const passport = require('passport');
// google authentication
require('../middleware/oauth.js');
const session = require('express-session');
// Routes
const product = require('../routes/Product.js');
const category = require('../routes/Category.js');
const order = require('../routes/Order.js');
const { error } = require('../middleware/error.js');

module.exports = function (app) {
  app.use(express.json());

  // Define Routes
  app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Login with Google</a>');
  });
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  app.get('/auth/google/callback', passport.authenticate('google'), {
    successRedirect: '/api/product',
    failureRedirect: '/auth/failure'
  });
  app.get('/auth/failure', (req, res) => {
    res.send('Failed to authenticate..');
  });
  app.use('/api/category', category); // Complete as of 5/11/2024
  app.use('/api/product', product); // Complete as of 5/12/2024 -  review getAllProducts
  app.use('/api/order', order);
  app.use(error);
};