const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: Object, required: true },
    isDeleted: { type: Boolean, 'default': false }
  },
  {
    timestamps: true
  }
);

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
