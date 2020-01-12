const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
var categories = mongoose.model('categories');
var products = mongoose.model('products');
var path = require('path');

// route for get the ProductCount Which are related to category
router.get('/itemcount', (req, res) => {
    categories.aggregate([
        {
          '$lookup': {
            from: 'products',
            localField: '_id',
            foreignField: 'categoryId',
            as: 'items'
          }
        },
        {
          $redact: {
            $cond: {
              if: { $gt: [{ $size: { '$ifNull': ['$items', []] } }, 0] },
              then: '$$KEEP',
              else: '$$PRUNE'
            }
          }
        },
            {
          '$project': {
            productCount: { '$size': '$items' },
            name: '$name',
            type: '$type'
          }
        }
        
      ], function(err, categoriesData){
         if(!err) {
             res.render('index',{ data : categoriesData});
            // res.send(categoriesData); 
            console.log(categoriesData);
         } else {
             console.log(err);
         }
    })
})

// route for gettting all categories
router.get("/getCategories", (req, res) => {
  categories.find(function(err, categories) {
    if(!err) {
      res.render('categories', {data: categories})
      console.log(categories);
    } else{
      console.log(err);
    }
  })
})

// route for deleteCategories and also delete its related products from product model
router.get('/deleteCategory/:id' , (req, res) => {
  var categoryId = mongoose.Types.ObjectId(req.params.id);
  console.log(categoryId);
  categories.remove({ _id: categoryId}, function (err, doc) {
    if (!err) {
      products.deleteMany({ 'categoryId': { $in: [categoryId]} }, function(err, data) {
        if(!err) {
          res.render('deleteCategorey');
          console.log(data)
        } else {
          console.log(err);
        }
      })
    } else {
      console.log(err);s
    }
})
})

module.exports = router;