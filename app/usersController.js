/**
 * Created by sissoko on 16/05/2016.
 */
var bcrypt = require("bcryptjs")
var schemas = require("./schemas")
var User = schemas.User

exports.createUser = function (request, response) {
    var form = request.body;
    schemas.isNotUserFormValid(form, function (err) {
        if (err) {
            response.status(400).send(err);
        } else {
            response.contentType('application/json');
            var user = new User(form);
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(form.password, salt);
            user.password = hash;
            user.save(function (err) {
                if (err) {
                    throw err;
                }
                console.log(user.email + ' successful added !');
                response.send(user);
            });
        }
    });
}

exports.getUser = function (request, response) {

}

exports.login = function (request, response) {
    var form = request.body;
    var error = "Login or password incorrect.";
    schemas.validLoginForm(form, function (err) {
        if (err) {
            response.status(400).send(err);
        } else {
            User.findOne({email: form.username}, function (err, user) {
                if (err) {
                    response.status(400).send(err);
                } else {
                    if (user) {
                        if (checkPassword(form.password, user.password) !== true) {
                            response.status(400).send(error);
                        } else {
                            response.send(user);
                        }
                    } else {
                        response.status(400).send(error);
                    }
                }
            });
        }
    })
}

var checkPassword = function (clearText, password) {
    return bcrypt.compareSync(clearText, password);
}

