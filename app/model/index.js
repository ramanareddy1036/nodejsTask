const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/tasksdb', { useNewUrlParser: true }, function (err, database) {
    // Log Error
    if (err) {
        console.error('Could not connect to Public Portal DB!');
        console.error(err);
    } else {
        console.log('connected');
    }
});
var categories = require('./categories.model');
var products = require('./products.model');