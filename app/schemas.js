/**
 * Created by sissoko on 13/05/2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
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
    year: String,
    create_date: {type: Date, default: Date.now},
    modify_date: {type: Date, default: Date.now},
});

var User = mongoose.model('User', userSchema);
var Book = mongoose.model('Book', bookSchema);

exports.User = User;
exports.Book = Book;

exports.isNotBookFormValid = function (bookForm) {
    if (bookForm === undefined
        || bookForm.title === undefined
        || bookForm.author === undefined
    ) {
        return true;
    }
    return false;
}

exports.isNotUserFormValid = function (userForm, callback) {
    if (userForm === undefined
        || userForm.email === undefined
        || userForm.password === undefined) {
        callback("Incorrect information");
    }
    exports.User.findOne({email: userForm.email}, function (err, user) {
        if (err) {
            callback(err);
        }
        if (user != null) {
            callback("User exists");
        } else {
            callback();
        }
    });
}

exports.validLoginForm = function (form, callback) {
    var error = "Login or password incorrect.";
    if (form === undefined
        || form.username === undefined
        || form.password === undefined) {
        callback(error);
    }
    callback();
}

