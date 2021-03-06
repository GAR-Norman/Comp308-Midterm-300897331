/* File Name: books.js
Author: Gabriel Norman
Student ID: 300897331
Project Name: Comp308 - W2019 - Midterm - 300897331 */

let mongoose = require('mongoose');

// create a model class
let gamesSchema = mongoose.Schema({
  Title: String,
  Description: String,
  Price: Number,
  Author: String,
  Genre: String
}, {
  collection: "books"
});

module.exports = mongoose.model('books', gamesSchema);