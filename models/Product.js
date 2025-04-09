const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  inventoryCount: Number
});

module.exports = mongoose.model('Product', productSchema);
