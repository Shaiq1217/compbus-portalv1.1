const User = require('../models/User');
const utils = require('../utils/Utility');
const passport = require('passport');
const _ = require('lodash');
const statusCodes = require('http-status-codes');
class Users {

  /**
   * ************************************************************
   * Local authentication
   * ************************************************************
   */
  async signup(req, res) {
    const { username, email, password } = req.body;
    if (await utils.isFirstUser()) {
      const user = new User({
        username,
        email,
        password,
        isDeleted: false,
        isGoogleAuth: false,
        role: utils.userRoles.ADMIN
      });
      await user.save();
      return res.status(201).json({ status: true, message: 'User created successfully' });
    }
    const user = new User({
      username,
      email,
      password,
      isDeleted: false,
      isGoogleAuth: false
    });

    await user.save();
    return res.status(statusCodes.StatusCodes.CREATED).json({ status: true, message: 'User created successfully' });
  }
  async login(req, res) {
    passport.authenticate('local', {
      successRedirect: '/api/auth/self',
      failureRedirect: '/api/auth/failure'
    })(req, res);
  }
  userLogout(req, res) {
    req.logout();
    return res.redirect('/api/auth/failure');
  }
  requestLogin(req, res) {
    return res.status(statusCodes.StatusCodes.OK).json({ status: true, message: 'Login/Signup required' });
  }
  async setRoleForUser(req, res) {
    // write a controller to set role for a user
    const { role } = req.body;
    const user = await User.findById(req.params.userId);
    user.role = role;
    await user.save();

    return res.status(statusCodes.StatusCodes.ACCEPTED).json({ status: true, message: 'Role set successfully' });
  }
  async updateProfile(req, res) {
    const { email } = req.user;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(statusCodes.StatusCodes.NOT_FOUND).json({ status: false, message: 'User not found' });
    }
    Object.assign(user, req.body);
    await user.save();
    return res.status(statusCodes.StatusCodes.ACCEPTED).json({ status: true, message: 'Profile updated successfully' });
  }
  /**
   * ************************************************************
   * Get Users
   * ************************************************************
   */
  async getByRole(req, res) {
    const { key } = req.query;
    console.log(key);
    const users = await User.find({
      role: key
    });
    return res.status(statusCodes.StatusCodes.OK).json({ status: true, data: users });
  }
  async getUser(req, res) {
    const { email } = req.user;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(statusCodes.StatusCodes.NOT_FOUND).json({ status: false, message: 'User not found' });
    }
    return res.status(statusCodes.StatusCodes.OK).json({ status: true, data: user });
  }
  async getAllUsers(req, res) {
    const users = await User.find({});
    users.forEach(user => _.pick(user, utils.userProps));
    return res.status(statusCodes.StatusCodes.OK).json({ status: true, data: users });
  }
  /**
   * ************************************************************
   * Google authentication
   * ************************************************************
   */
  googleSignup(req, res) {
    return res.send('<a href="/api/auth/google">Login with Google</a>');
  }
  googleAuthenticator(req, res) {
    passport.authenticate('google', {
      successRedirect: '/api/product',
      failureRedirect: 'api/auth/failure'
    })(req, res)
  }
  googleLogin(req, res) {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res)
  }

}

const user = new Users();
module.exports = user;