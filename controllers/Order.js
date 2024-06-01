const { order: orderModel } = require('../models/Order.js');
class Orders {
  getAllOrders(req, res) {
    res.send('Get all orders');
  }

  getOrderById(req, res) {
    res.send('Get order by id');
  }

  getOrderByUser(req, res) {
    res.send('Get order by user');
  }

  getOrderByProduct(req, res) {
    res.send('Get order by product');
  }

  createOrder(req, res) {
    res.send('Create order');
  }

  updateOrder(req, res) {
    res.send('Update order');
  }

  deleteOrder(req, res) {
    res.send('Delete order');
  }
}

const order = new Orders();
module.exports = order;