var express = require('express'),
    app = express(),
    http = require('http'),
    mongoose = require('mongoose'),
    routesLoader = require("./routesLoader");

mongoose.connect('mongodb://localhost/bibex');

const server = http.createServer(app).listen(8000, function (err) {
    if (err) {
        console.log(err);
    } else {
        const host = server.address().address;
        const port = server.address().port;
        console.log('Server listening on ' + host + ':' + port);
    }
});

routesLoader.loadRoutes(app);

