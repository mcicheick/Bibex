/**
 * Created by sissoko on 12/05/2016.
 */
var controllers = require("./controllers")

var Route = function (routeLine) {
    this.method = routeLine[0];
    this.route = routeLine[1];
    this.action = controllers[routeLine[2]];
}

exports.loadRoutes = function (app) {
    var fs = require('fs');
    var path = require('path');
    var filePath = path.join(__dirname, "routes");
    var lineReader = require('readline').createInterface({
        input: fs.createReadStream(filePath)
    });
    var reg = new RegExp("[ \t]+", "g");
    var lineCount = 0;
    lineReader.on('line', function (line) {
        line = line.trim();
        lineCount++;
        if (line != '' && !line.startsWith("#")) {
            var routeLine = line.split(reg);
            if (routeLine.length != 3) {
                throw "Error in line[" + lineCount + "]\n" + line
            }
            var route = new Route(routeLine);
            if (route.action !== undefined) {
                if (route.method === 'GET') {
                    app.get(route.route, route.action);
                } else if (route.method === 'POST') {
                    app.post(route.route, route.action);
                }
            } else {
                throw "Route [" + line + "] not implemented";
            }
        } else {
            if(line.startsWith("#")) {
                console.log("Commented line " + line)
            }
        }
    });
};

