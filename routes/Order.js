const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const order = require('../controllers/Order.js');

router.get('/', order.getAllOrders);
router.get('/:id', order.getOrderById);
router.get('/user/:userId', order.getOrderByUser);
router.get('/product/:productId', order.getOrderByProduct);
router.post('/', order.createOrder);

router.put('/:id', order.updateOrder);
router.delete('/:id', order.deleteOrder);


module.exports = router;