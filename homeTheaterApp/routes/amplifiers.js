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

	var amplifier = new Amplifier;

	amplifier.component = amplifier.brand = amplifier.cost =
	amplifier.performance = amplifier.reliability = amplifier.powerHandling =
	amplifier.inputs = amplifier.outputs = undefined;

	amplifier.component = req.body.component;
	amplifier.brand	= req.body.brand;
	amplifier.cost = req.body.cost;
	amplifier.performance = req.body.performance;
	amplifier.reliability = req.body.reliability;
	amplifier.powerHandling = req.body.powerHandling;
	amplifier.inputs = req.body.inputs; // forEach not necessary when set directly equal to the array
	amplifier.outputs = req.body.outputs; // in television I just used [] here and then pushed

	// var inputs = req.body.inputs;
	// var outputs = req.body.outputs;

	// inputs.forEach(function postInput(input, index, array) {
	// 	amplifier.inputs.push(input);
	// });

	// outputs.forEach(function postOutput(output, index, array) {
	// 	amplifier.outputs.push(output);
	// });

	amplifier.save(function (err, newAmplifier) {
		if (err) {
			console.log("Mongoose error creating a new amplifier.");
			res.status(400);
			res.json({ error: err });
		} else {
			res.status(201);
			res.json(newAmplifier);
		};
		next();
	});
});

module.exports = router;