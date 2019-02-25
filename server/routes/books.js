// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  //Redirects to the details page, but passes an empty book object
  res.render('books/details', {
    title: 'Add a New Book',
    books: ''
  });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  //Creating a new book and adding it
  let newBook = book({

    "Title": req.body.title,
    "Description": '',
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre

  });

  book.create(newBook, (err, contactModel) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      res.redirect('/books');
    }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  let id = req.params.id;

  book.findById(id, (err, bookObject) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // show the book editing view
      res.render('books/details', {
        title: 'Edit your Chosen Book',
        books: bookObject
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let id = req.params.id;
  let updatedBook = book({
    "_id": id,
    "Title": req.body.title,
    "Description": '',
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  book.update({
    _id: id
  }, updatedBook, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list page
      res.redirect('/books');
    }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;

  book.remove({
    _id: id
  }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      res.redirect('/books');
    }
  });
});


module.exports = router;