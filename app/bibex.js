var express = require('express');
var app = express();
var http = require('http');
var mongoose = require('mongoose');
var routesLoader = require("./routesLoader");

var config = require("./config")

mongoose.connect(config.db.url);

var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

const server = http.createServer(app).listen(config.server.port, function (err) {
    if (err) {
        console.log(err);
    } else {
        const host = server.address().address;
        const port = server.address().port;
        console.log('Server listening on ' + host + ':' + port);
    }
});

routesLoader.loadRoutes(app);

