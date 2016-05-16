/**
 * Created by sissoko on 16/05/2016.
 */

exports.serveContent = function (request, response) {
    var path = request.path;
    console.log(path);
    if (!path.startsWith("/public") && !path.startsWith("/views")) {
        response.status(403).send("Access forbidden");
    } else {
        response.sendFile(__dirname + request.path);
    }
}