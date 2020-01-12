var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var products = new Schema({
  name: String,
  price: Number,
  categoryId: String,
  quantity: Number
});

mongoose.model('products', products);