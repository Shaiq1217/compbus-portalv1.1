const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const Users = require('../controllers/Users.js');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/errorAndAuth.js');
//login and sign up
router.get('/self',ensureAuthenticated, Users.getUser);
router.post('/signup', Users.signup);
router.post('/login', Users.login);
//authorization
router.get('/role', ensureAuthenticated, ensureAdmin, Users.getByRole); 
router.get('/', ensureAuthenticated, ensureAdmin, Users.getAllUsers)
router.patch('/users/:userId/role', ensureAuthenticated, ensureAdmin, Users.setRoleForUser);
//google login and sign up
router.get('/google-signup', Users.googleSignup);
router.get('/google', Users.googleLogin);
router.get('/google/callback', Users.googleAuthenticator);
//404 route and logout
router.get('/logout', Users.userLogout);
router.get('/failure', Users.requestLogin);

module.exports = router;
