var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Speaker = require('../models/Speaker.js');

// GET /speakers
router.get('/', function(req, res, next) {
	Speaker.find(function(err, speakers) {
		if (err) return next(err);
		res.json(speakers);
	});
});

// POST /speakers
router.post('/', function(req, res, next) {
	Speaker.create({
		component : 'speaker',
		brand : 'klipsch',
		cost : 300,
		performance : 5,
		reliability : 0.7,
		powerHandlingMin : 5,
		powerHandlingMax : 85,
		inputs : [
			{
				type : 'speaker-r',
				quantity : 1
			},
			{
				type : 'speaker-l',
				quantity : 1
			}
		],
		outputs : []
		}, function(err, klipschSpeaker) {
			if (err) { console.log(err) }
			else console.log(klipschSpeaker);
		});

	next();
});

module.exports = router;