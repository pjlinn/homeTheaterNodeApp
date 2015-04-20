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

	var speaker = new Speaker;

	// Not sure if this is necessary. Took from ctindel, but I think he did it for the strom authentication
	speaker.component = speaker.brand = speaker.cost =
	speaker.performance = speaker.reliability =
	speaker.power_handling_min = speaker.power_handling_max =
	speaker.inputs = speaker.outputs = undefined;

	speaker.component = req.body.component;
	speaker.brand = req.body.brand;
	speaker.cost =  req.body.cost;
	speaker.performance = req.body.performance;
	speaker.reliability = req.body.reliability;
	speaker.powerHandlingMin = req.body.powerHandlingMin;
	speaker.powerHandlingMax = req.body.powerHandlingMax;
	speaker.inputs = req.body.inputs;
	speaker.outputs = req.body.outputs;

	console.log(req.body.inputs);

	speaker.save(function (err, speakers){
		if (err) {
			console.log("Mongoose error creating a new speaker.");
			res.status(400);
			res.json({ error: err });
		} else {
			res.status(201);
			res.json(speaker);
			// console.log(res.body);
		};
		next();
	});
});

module.exports = router;