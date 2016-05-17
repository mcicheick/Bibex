/**
 * Created by sissoko on 12/05/2016.
 */

var schemas = require("./schemas")
var utils = require("./utils")

var Book = schemas.Book;

exports.index = function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
}

exports.books = function (request, response) {
    var page = request.query.page;
    var bookPageSize = request.query.pageSize * 1;
    Book.find().sort({title: 1}).limit(bookPageSize).skip((page - 1) * bookPageSize)
        .exec(function (err, books) {
        if (books != null) {
            response.contentType('application/json');
            response.send(books);
        } else {
            response.send(err);
        }
    })

}

exports.getBook = function (request, response) {
    response.contentType('application/json');
    var id = request.params.id;
    Book.findOne({_id: id}, function (err, book) {
        if (err) {
            throw err;
        }
        response.send(book);
    })
}

exports.createBook = function (request, response) {
    var bookForm = request.body;
    if (schemas.isNotBookFormValid(bookForm)) {
        response.status(400).send("Incorrect");
        return;
    }
    response.contentType('application/json');
    var book = new Book(bookForm);
    book.save(function (err) {
        if (err) {
            throw err;
        }
        console.log(book.title + ' successful added !');
        response.send(book);
    });
}

exports.doSearch = function (request, response) {
    var textQuery = utils.textSearch(request.query.q);
    Book.find(textQuery).sort({create_date: -1}).exec(function (err, books) {
        if (err) {
            throw err;
        }
        response.send(books);
    })
}