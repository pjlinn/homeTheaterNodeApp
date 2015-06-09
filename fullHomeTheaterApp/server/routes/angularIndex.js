/*
	API route that feeds the angular index file when
	going to the app home page.
*/

var path = require('path');
var express = require('express');
var router = express.Router();

// GET /home
router.get('/', function(req, res, next) {
	res.sendFile('/index.html', { root: './client'} , function(err) {
		if (err) {
			console.log(err);
			res.status(err.status).end();
		} else {
			console.log('Sent: it');
		}
	});
});

module.exports = router;