var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Component = require('../models/Component.js');

var query;

// GET /components
router.get('/', function(req, res, next) {
	query = Component.find();
	query.select('-__v -_id');
	query.exec(function(err, components) {
		if (err) return err;
		res.json(components);
		next();
	});
});

/*
	GET with paramters
*/

// GET /components/:component
router.get('/:component', function(req, res, next) {
	var component = req.params.component;

	query = Component.where({ component: component });
	query.findOne();
	query.select('-__v -_id');
	query.exec(function(err, components) {
		if (err) return err;
		res.json(components);
		next();
	});
});

// POST /components
router.post('/', function(req, res, next) {
	var component = new Component;

	component.component = component.brand = component.cost = component.performance =
	component.reliability = component.height = component.width = 
	component.thickness = component.weight = component.powerHandlingMin =
	component.powerHandlingMax = component.powerHandling =
	component.inputs = component.outputs = undefined;

	component.component = req.body.component;
	component.brand = req.body.brand;
	component.cost = req.body.cost;
	component.performance = req.body.performance;
	component.reliability = req.body.reliability;
	component.height = req.body.height;
	component.width = req.body.width;
	component.thickness = req.body.thickness;
	component.weight = req.body.weight;
	component.powerHandlingMin = req.body.powerHandlingMin;
	component.powerHandlingMax = req.body.powerHandlingMax;
	component.powerHandling = req.body.powerHandling;
	component.inputs = req.body.inputs;
	component.outputs = req.body.outputs;

	component.save(function(err, newComponent) {
		if (err) {
			console.log('Mongoose error creating new component.');
			res.status(400);
			res.json({ status: err });
		} else {
			res.status(201);
			res.json(newComponent);
		};
		next();
	});
});

// DELETE /components
router.delete('/', function(req, res, next) {
	query = Component.remove({});
	query.exec(function(err) {
		if (err) return err;
		res.json({ status: 'All components deleted.' });
		next();
	});
});

module.exports = router;