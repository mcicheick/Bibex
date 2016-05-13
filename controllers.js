/**
 * Created by sissoko on 12/05/2016.
 */
var schemas = require("./schemas")

var Book = schemas.Book

exports.index = function (req, res) {
    res.sendFile(__dirname + '/index.html');
}

exports.books = function (req, res) {
    Book.find(function (err, books) {
        if (books != null) {
            res.send(books);
        }
    })
}

exports.getBook = function (req, res) {
    var title = req.params.title;
    Book.findOne({title: title}, function (err, book) {
        if (err) {
            throw err;
        }
        res.send(book);
    })
}

exports.rents = function (req, res) {
    console.log(req.query)
    res.send(req.query);
}

exports.createBook = function (req, res) {
    var bookForm = req.query;
    res.contentType('application/json');
    if (isNotBookFormValid(bookForm)) {
        res.status(400).send(bookForm);
        return;
    }
    var book = new Book(bookForm);
    book.save(function (err) {
        if (err) {
            throw err;
        }
        console.log(book.title + ' successful added !');
        res.send(book);
    });
}

var isNotBookFormValid = function (bookForm) {
    if (bookForm === undefined
        || bookForm.title === undefined
        || bookForm.author === undefined
    ) {
        return true;
    }
    return false;
}

exports.serveContent = function (req, res) {
    console.log(req.path)
    res.sendFile(__dirname + req.path)
}