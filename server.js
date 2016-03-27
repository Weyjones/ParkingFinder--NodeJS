var express = require('express');
var logger = require('./lib/modules/logger/logger');
var utils = require('./lib/modules/utils/utils');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false});

var redis = require('./lib/modules/redis/redis');

var app = express();
app.use(logger);

var fs = require('fs');

app.use(express.static('public'));
app.get('/listUsers', function(req, res) {
	fs.readFile(__dirname + "/" + "users.json", "utf8", function(err, data) {
		res.send(data);
	});
});

app.get('/listStates', function(req, res) {
	fs.readFile(__dirname + "/" + "states.json", "utf8", function(err, data) {
		res.send(JSON.parse(data));
	});
});

/**
 * parkingObject: {
 * 		street: [string],
 * 		city: [string],
 * 		state: [string],
 *		zip: [number],
 *		longitude: [number],
 *		latitude: [number],	
 *		rate: [number],
 *		type: [string]
 * }
 */
app.post('/parking/create', parseUrlencoded, function(req, res) {
	var parkingObject = req.body;
	parkingObject.id = utils.uuid();
	redis.lpush('parkings', JSON.stringify(parkingObject));
	res.status(201).json(parkingObject);
});

app.get('/parking/list', function(req, res) {
	redis.lrange('parkings', 0, -1, function(err, data) {
		data = data.map(JSON.parse);
		res.json(200, data);
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
