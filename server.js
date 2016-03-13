var express = require('express');

var app = express();
var fs = require('fs');
/*
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});
*/
app.use(express.static('public'));
app.get('/listUsers', function(req, res) {
	fs.readFile(__dirname + "/" + "users.json", "utf8", function(err, data) {
		console.log(data);
		res.end(data);
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