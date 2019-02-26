/* File Name: index.js
Author: Gabriel Norman
Student ID: 300897331
Project Name: Comp308 - W2019 - Midterm - 300897331 */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
  });
});

module.exports = router;