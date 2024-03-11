const express = require('express');
const router = express.Router();

const {addBook,updateBook,deleteBook,showAllBooks,showBook} = require('../Controllers/library.controllers');
const {signup,login} = require('../Controllers/user.controllers');
const {borrow,returning} = require('../Controllers/borrowAndReturn')

//user sign up 
router.post('/signup',signup);
//user log in 
router.post('/login',login)

//CRUD operations
router.post('/books',addBook);
router.put('/books/:id',updateBook);
router.delete('/books/:id',deleteBook);
router.get('/books',showAllBooks);
router.get('/books/:id',showBook);

//borrow and return 
router.get('/borrow/:id',borrow);
router.get('/return/:id',returning);


module.exports = router;