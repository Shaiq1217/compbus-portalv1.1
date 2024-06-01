const express = require('express');
const passport = require('passport');
// eslint-disable-next-line new-cap
const router = express.Router();
const Users = require('../controllers/Users.js');
const { ensureAuthenticated } = require('../middleware/errorAndAuth.js');
// Define Routes
router.post('/signup', Users.create);
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/api/auth/self');
});
router.get('/self',ensureAuthenticated, Users.getProfile);
router.get('/logout', Users.userLogout);
router.patch('/role', Users.handleRole);
router.get('/google-signup', (req, res) => {
  res.send('<a href="/api/auth/google">Login with Google</a>');
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/api/product',
  failureRedirect: 'api/auth/failure'
}));

router.get('/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

module.exports = router;
