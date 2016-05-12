var express = require('express')
app = express(),
    http = require('http'),
    mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://localhost/bibex'),
    Schema = mongoose.Schema,
    BOOK_COUNT = 0;

var userSchema = new Schema({
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    create_date: {type: Date, default: Date.now},
    modify_date: {type: Date, default: Date.now},
});

var bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    edition: String,
    create_date: {type: Date, default: Date.now},
    modify_date: {type: Date, default: Date.now},
});

var User = mongoose.model('User', userSchema);
var Book = mongoose.model('Book', bookSchema);

const server = http.createServer(app).listen(8080, function (err) {
    if (err) {
        console.log(err);
    } else {
        const host = server.address().address;
        const port = server.address().port;
        console.log('Server listening on ' + host + ':' + port);
    }
});

app.get('/', function (req, res) {
    res.contentType('application/json');

    User.find({'email': 'cheickm.sissoko@gmail.com'}, function (err, user) {
        if (user != null) {
            console.log('Found the User:' + user.length);
            res.send(user);
        }
    });
});

app.get("/book", function (req, res) {
    var bookForm = req.query;
    res.contentType('application/json');
    if(isNotBookFormValid(bookForm)) {
        res.status(400).send(bookForm);
        return;
    }
    var book = new Book(bookForm);
    book.save(function (err) {
        if (err) {
            throw err;
        }
        console.log(book.title + ' successful added !');
        // On se déconnecte de MongoDB maintenant
    });
    Book.find(function (err, books) {
        if (books != null) {
            res.send(books);
        }
    })
});

var isNotBookFormValid = function (bookForm) {
    if (bookForm === undefined
        || bookForm.title === undefined
        || bookForm.author === undefined
    ) {
        return true;
    }
    return false;
}