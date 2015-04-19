var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Amplifier = require('../models/Amplifier.js');

// GET /amplifiers
router.get('/', function(req, res, next) {
	Amplifier.find(function(err, televisions) {
		if (err) return next(err);
		res.json(televisions);
	});
});

// POST /amplifiers
router.post('/', function(req, res, next) {
	Amplifier.create({
		component : 'amplifier',
		brand : 'bose',
		cost : 300,
		performance : 10,
		reliability : 0.8,
		power_handling : 100,
		inputs : [
			{
				type : 'ac power',
				quantity : 1
			},
			{
				type : 'audio-l',
				quantity : 1
			},
			{
				type : 'audio-r',
				quantity : 1
			}
		],
		outputs : [
			{
				type : 'speaker-l',
				quantity : 1
			},
			{
				type : 'speaker-r',
				quantity : 1
			}
		]
		}, function(err, boseAmp) {
			if (err) { console.log(err) }
			else console.log(boseAmp);
		});

	next();
});

module.exports = router;