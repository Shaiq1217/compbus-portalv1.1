// Routes
const product = require('../routes/Product.js');
const category = require('../routes/Category.js');
const order = require('../routes/Order.js');
const auth = require('../routes/Auth.js');
const { error, ensureAuthenticated } = require('../middleware/errorAndAuth.js');


module.exports = function (app) {
  app.use('/api/auth', auth);
  app.use('/api/category', ensureAuthenticated, category);
  app.use('/api/product', ensureAuthenticated, product);
  app.use('/api/order', ensureAuthenticated, order);
  app.use(error);
};
