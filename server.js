var express = require('express');
var logger = require('./lib/modules/logger/logger');

var app = express();
app.use(logger);
var fs = require('fs');

app.use(express.static('public'));
app.get('/listUsers', function(req, res) {
	fs.readFile(__dirname + "/" + "users.json", "utf8", function(err, data) {
		console.log(data);
		res.send(data);
	});
});

app.get('/blocks', function(req, res) {
	var blocks = ['Fixed', 'Movable', 'Rotating'];
	res.send(blocks);
});

var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port
	console.log("app at http://%s:%s", host, port)
});
