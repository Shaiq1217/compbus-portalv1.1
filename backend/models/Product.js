/* eslint-disable quote-props */
const mongoose = require('mongoose');

const commonFields = {
  name: { type: String, required: true },
  description: { type: String },
  tags: { type: [String] },
  quantity: { type: Number, default: 0 },
  price: { type: Number, required: true },
  image: { type: String },
  categoryId: { type: mongoose.Schema.Types.ObjectId, required: true },
  detail: { type: mongoose.Schema.Types.ObjectId },
  discount: { type: Number, default: 0 },
  category: { type: String, required: true },
  isDeleted: { type: Boolean, default: false }
};
const productSchema = new mongoose.Schema(
  {
    ...commonFields,
    detail: { type: mongoose.Schema.Types.ObjectId, refPath: 'detail', default: null }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports =
  Product;
