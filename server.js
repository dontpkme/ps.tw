const PORT = 9393;

var http = require("http");
var util = require('./util.js');

exports.start = function(route) {
	var onRequest = function(request, response) {
		route(request.method, request, response);
	}
	var server = http.createServer(onRequest).listen(PORT);
};

console.log("server started at " + new Date() + ". Port " + PORT + ".");