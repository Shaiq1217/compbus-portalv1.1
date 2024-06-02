
const statusCodes = require('http-status-codes');
//models
const User = require('../models/User.js');
const Product = require('../models/Product.js');
const Order = require('../models/Order.js');

class Orders {
  async getAllOrders(req, res) {
    const orders = await Order.find({}).populate('user').populate('products.product');
    if (!orders || orders.length === 0) {
      return res.status(statusCodes.StatusCodes.NOT_FOUND).json({ status: false, message: 'No orders found' });
    }
    console.log(orders)
    return res.status(statusCodes.StatusCodes.OK).json({ status: true, message: 'All orders', data: orders });
  }
  async getOrderById(req, res) {
    const { id } = req.params;
    const order = await Order.findById(id).populate('user').populate('products.product');
    if (!order) {
      return res.status(statusCodes.StatusCodes.NOT_FOUND).json({ status: false, message: 'Order not found' });
    }
    return res.status(statusCodes.StatusCodes.OK).json({ status: true, message: 'Order found', data: order });
  }
  async getOrderByUser(req, res) {

    const userId = req.user.id;

    const orders = await Order.find({ user: userId })
      .populate('user')
      .populate('products.product')
      .lean(); // Convert documents to plain JavaScript objects

    if (!orders || orders.length === 0) {
      return res.status(statusCodes.StatusCodes.NOT_FOUND).json({ status: false, message: 'No orders found' });
    }

    return res.status(statusCodes.StatusCodes.OK).json({ status: true, message: 'Orders found', data: orders });

  }
  async getOrderByProduct(req, res) {
    const { id } = req.params;
    const product = await Product.findById(id)
    if (!product) {
      return res.status(statusCodes.StatusCodes.NOT_FOUND).json({ status: false, message: 'Product not found' });
    }
    const orders = await Order.find({ 'products.product': id }).populate('user').populate('products.product');
    if (!orders) {
      return res.status(statusCodes.StatusCodes.NOT_FOUND).json({ status: false, message: 'No orders found' });
    }
    return res.status(statusCodes.StatusCodes.OK).json({ status: true, message: 'Orders found', data: orders });
  }
  async createOrder(req, res) {
    const productOrders = req.body;
    const products = await Promise.all(
      productOrders.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
        return { product: product._id, price: product.price, quantity: item.quantity };
      })
    );
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(statusCodes.StatusCodes.NOT_FOUND).json({ status: false, message: 'User not found' });
    }
    if (!user.shippingAddress) {
      return res.status(statusCodes.StatusCodes.BAD_REQUEST).json({ status: false, message: 'Please add a shipping address' });
    }
    const totalPrice = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    const order = new Order({
      user: user._id,
      products,
      totalPrice,
      status: 'Pending',
      shippingAddress: user.shippingAddress
    });
    const result = await order.save();
    return res.status(statusCodes.StatusCodes.CREATED).json({ status: true, message: 'Order created', data: result });
  }
  async updateOrder(req, res) {
    const { id } = req.params;
    const order = Order.findById({ _id: id });
    if (!order) {
      return res.status(statusCodes.StatusCodes.NOT_FOUND).json({ status: false, message: 'Order not found' });
    }
    Object.assign(order, req.body);
    const result = await order.save();
    return res.status(statusCodes.StatusCodes.OK).json({ status: true, message: 'Order updated', data: result });

  }

  deleteOrder(req, res) {
    const { id } = req.params;
    if (!order) {
      return res.status(statusCodes.StatusCodes.NOT_FOUND).json({ status: false, message: 'Order not found' });
    }
    const order = Order.findByIdAndUpdate(id);
    order.isDeleted = true;
    return res.status(statusCodes.StatusCodes.OK).json({ status: true, message: 'Order deleted' });
  }
}

const order = new Orders();
module.exports = order;