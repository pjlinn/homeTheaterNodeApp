var express = require('express');
var mongoose = require('mongoose');

var televisions = require('./routes/televisions.js');
var amplifiers = require('./routes/amplifiers.js');
var speakers = require('./routes/speakers.js');
var components = require('./routes/components.js');

mongoose.connect('mongodb://localhost/homeTheaterDb', function(err) {
	if (err) {
		console.log('connection error', err);
	} else {
		console.log('connection successful');
	}
});

var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

// GET -- taken from the ctindel ex, not sure what it does
// Fixed the frisby error: "Expected 'text/html; charset=utf-8' to equal 'application/json; charset=utf-8'."
app.get('/*', function(req, res, next) {
	res.contentType('application/json');
	next();
});

// POST -- same note as above
// what's the difference between app. and router.?
app.post('/*', function(req, res, next) {
	res.contentType('application/json');
	next();
});

app.use('/televisions', televisions);
app.use('/amplifiers', amplifiers);
app.use('/speakers', speakers);
app.use('/components', components);

module.exports = app;