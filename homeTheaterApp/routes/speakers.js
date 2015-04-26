var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Speaker = require('../models/Speaker.js');

var query;

// GET /speakers
router.get('/', function(req, res, next) {
	query = Speaker.find();
	query.exec(function(err, speakers) {
		if (err) return next(err);
		res.json(speakers);
		next();
	});
});

// GET one /speakers/getOneSony
router.get('/getOneSony', function(req, res, next) {
	query = Speaker.findOne({ brand: 'sony' });
	query.select('-_id -__v');
	query.exec(function(err, speaker) {
		if (err) { return err };
		res.json(speaker);
		next();
	});
});

// GET /speakers/:id
router.get('/:id', function(req, res, next) {
	Speaker.findById(req.params.id, function(err, speaker) {
		if (err) return err;
		res.json(speaker);
		next();
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
	speaker.outputs = [{}];

	// console.log(req.body.inputs);

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

// PUT /speakers/:id
router.put('/:id', function(req, res, next) {
	Speaker.findByIdAndUpdate(req.params.id, { brand: req.body.brand }, function(err, updatedSpeaker) {
		if (err) return err;
		res.json(updatedSpeaker);
		next();
	});
});

// DELETE /speakers
router.delete('/', function(req, res, next) {
	query = Speaker.remove({});
	query.exec(function(err) {
		if (err) return next(err);
		res.json({ status: 'Speakers have been deleted.' });
		next();
	});
});

module.exports = router;