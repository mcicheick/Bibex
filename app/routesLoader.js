/**
 * Created by sissoko on 12/05/2016.
 */
var controllers = {
    books: require("./booksController"),
    users: require("./usersController"),
    assets: require("./assetsController")
}

var Route = function (routeLine) {
    this.method = routeLine[0];
    this.route = routeLine[1];
    var actionParts = routeLine[2].split(".");
    var controller = actionParts[0];
    var action = actionParts[1];
    this.action = controllers[controller][action];
}

exports.loadRoutes = function (app) {
    var fs = require('fs');
    var path = require('path');
    var filePath = path.join(__dirname, "routes");
    var lineReader = require('readline').createInterface({
        input: fs.createReadStream(filePath)
    });
    lineReader.on('line', function (line) {
        var route = lineParser(line);
        if (route) {
            addRoute(route, app);
        }
    });
};

var lineParser = function (line) {
    var reg = new RegExp("[ \t]+", "g");
    var lineCount = 0;
    line = line.trim();
    lineCount++;
    if (line != '' && !line.startsWith("#")) {
        var routeLine = line.split(reg);
        if (routeLine.length != 3) {
            throw "Error in line[" + lineCount + "]\n" + line
        }
        var route = new Route(routeLine);
        return route;
    } else {
        if (line.startsWith("#")) {
            console.log("Commented line " + line)
        }
    }
}

var addRoute = function (route, app) {
    if (route.action !== undefined) {
        if (route.method === 'GET') {
            app.get(route.route, route.action);
        } else if (route.method === 'POST') {
            app.post(route.route, route.action);
        }
    } else {
        throw "Route [" + line + "] not implemented";
    }
}

