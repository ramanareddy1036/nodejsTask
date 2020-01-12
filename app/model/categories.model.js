var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var categories = new Schema({
  name: String,
  type: String

});

mongoose.model('categories', categories);