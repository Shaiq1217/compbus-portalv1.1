const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require('../middleware/errorAndAuth.js');
const order = require('../controllers/Order.js');

//get requests
router.get('/', ensureAuthenticated, order.getAllOrders);
router.get('/:id', ensureAuthenticated, order.getOrderById);
router.get('/user/:id', ensureAuthenticated, order.getOrderByUser);
router.get('/product/:id', ensureAuthenticated, order.getOrderByProduct);
//create order
router.post('/', ensureAuthenticated, order.createOrder);
//update and delete order
router.put('/:id', ensureAuthenticated, order.updateOrder);
router.delete('/:id', ensureAuthenticated, order.deleteOrder);


module.exports = router;