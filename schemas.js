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
    create_date: {type: Date, default: Date.now},
    modify_date: {type: Date, default: Date.now},
});

exports.User = mongoose.model('User', userSchema);
exports.Book = mongoose.model('Book', bookSchema);