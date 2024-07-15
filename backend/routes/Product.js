const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const product = require('../controllers/Product.js');
router.get('/', product.getAllProducts);
router.get('/:id', product.getProductById);
router.get('/category/:categoryId', product.getProductByCategory);
router.get('/field/:id', product.getProductFieldDetails);
router.post('/', product.createProduct);
router.post('/:id/category/:categoryId', product.createProductDetails);
router.put('/:id', product.updateProduct);

module.exports = router;
