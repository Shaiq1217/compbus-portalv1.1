const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  isGoogleAuth: { type: Boolean, 'default': false },
  shippingAddress: { type: String },
  role: { type: String, required: true, 'default': 'user' },
  isDeleted: { type: Boolean, 'default': false }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
