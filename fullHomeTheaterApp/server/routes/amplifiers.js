var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Amplifier = require('../models/Amplifier.js');

var query;

// GET /amplifiers
router.get('/', function(req, res, next) {
	query = Amplifier.find();
	query.select('-__v -_id');
	query.exec(function(err, amplifiers) {
		if (err) { next(err) };
		res.json(amplifiers);
		next();
	});
});

// GET /amplifier/getOnePolk
router.get('/getOnePolk', function(req, res, next) {
	query = Amplifier.findOne({ brand: 'polk' });
	query.select('-__v -_id');
	query.exec(function(err, amplifier) {
		if (err) return err;
		res.json(amplifier);
		next();
	});
});

// GET /amplifiers/:id
router.get('/:id', function(req, res, next) {
	Amplifier.findById(req.params.id, function(err, amplifier) {
		if (err) return err;
		res.json(amplifier);
		next();
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

// PUT /amplifiers/:id
router.put('/:id', function(req, res, next) {
	Amplifier.findByIdAndUpdate(req.params.id, { brand: req.body.brand }, function(err, updatedAmplifier) {
		if (err) return err;
		res.json(updatedAmplifier);
		next();
	});
});

// DELETE /amplifiers
router.delete('/', function(req, res, next) {
	query = Amplifier.remove({});
	query.exec(function(err) {
		if (err) return err;
		res.json({ status: 'All amplifiers have been deleted.'})
		next();
	});
});

module.exports = router;