const config = require('config');
const mongoose = require('mongoose');

module.exports = async () => {
  await mongoose.connect(config.get('database.mongodb.uri'));
  console.log('Connected to MongoDB');
};
