const User = require('../models/User');
class Users {
  async create(req, res) {
    const { username, email, password } = req.body;
    const user = new User({
      username,
      email,
      password,
      isDeleted: false,
      isGoogleAuth: false
    });
    await user.save();
    return res.status(201).json({ status: true, message: 'User created successfully' });
  }

  async getProfile(req, res) {
    const { email } = req.user;
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }
    return res.status(200).json({ status: true, data: user });
  }

  async handleRole(req, res) {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    user.role = role;
    await user.save();
    return res.status(200).json({ status: true, message: 'Role updated successfully' });
  }

  userLogout(req, res) {
    req.logout();
    return res.redirect('/api/auth/self');
  }

  async login(req, res) {
    // write a login controller to authenticate user with hashed password
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ status: false, message: 'Invalid login credentials' });
    }
    return res.status(200).json({ status: true, message: 'Login successful' });
  }
}

const user = new Users();
module.exports = user;