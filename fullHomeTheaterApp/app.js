var express = require('./server/node_modules/express');
var mongoose = require('./server/node_modules/mongoose');

var televisions = require('./server/routes/televisions.js');
var amplifiers = require('./server/routes/amplifiers.js');
var speakers = require('./server/routes/speakers.js');
var components = require('./server/routes/components.js');
var angularIndex = require('./server/routes/angularIndex');

mongoose.connect('mongodb://localhost/homeTheaterDb', function(err) {
	if (err) {
		console.log('connection error', err);
	} else {
		console.log('connection successful');
	}
});

var app = express();
var bodyParser = require('./server/node_modules/body-parser');
var multer = require('./server/node_modules/multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

// GET -- taken from the ctindel ex, not sure what it does
// Fixed the frisby error: "Expected 'text/html; charset=utf-8' to equal 'application/json; charset=utf-8'."
app.get('/televisions', function(req, res, next) {
	res.contentType('application/json');
	next();
});

// POST -- same note as above
// what's the difference between app. and router.?
app.post('/*', function(req, res, next) {
	res.contentType('application/json');
	next();
});

// Was getting errors trying to link/src static files in my index.html file
// Had to add this line to express, identify the folder they were in
// and then append the dir before the paths in index.html
app.use('/client', express.static(__dirname + '/client'));
app.use('/televisions', televisions);
app.use('/amplifiers', amplifiers);
app.use('/speakers', speakers);
app.use('/components', components);
app.use('/home', angularIndex);

module.exports = app;