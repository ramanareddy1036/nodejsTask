const express = require('express')
const bodyParser= require('body-parser')
const app = express();
const connection = require('./app/model');
const path = require('path');
const courseController = require('./app/controllers/categories');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/categories', courseController);

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname+'/index.html'));
//   });

app.listen('3002', () => {
    console.log('Server Started');
})