/*
	API routes for the components. These
	are consumed by the Angular front-end.
*/

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Component = require('../models/Component.js');

var query;

// GET /components
router.get('/', function(req, res, next) {
	query = Component.find();
	query.select('-__v');
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
	query.select('-__v');
	query.exec(function(err, components) {
		if (err) return err;
		res.json(components);
		next();
	});
});

// GET /components/update/:_id 
/*
	Had to add another path. Kept getting the error: 
	Error: Can't set headers after they are sent.
	Someone said this meant the request was being called twice
	so I added another path (/find) and it works...Need to
	understand this better.
*/
router.get('/update/:_id', function(req, res, next) {
	var componentId = req.params._id;

	query = Component.where({ _id: componentId });
	query.find();
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

// POST /components/update/inputs/:_id
// router.post('/update/inputs/:_id', function(req, res, next) {
// 	var componentId = req.params._id;
// }

// PUT /components/update/:_id
router.put('/update/:_id', function(req, res, next) {
	var componentId = req.params._id;
	var updates = {
		component: req.body.component,
		brand: req.body.brand,
		cost: req.body.cost,
		performance: req.body.performance,
		reliability: req.body.reliability,
		height: req.body.height,
		width: req.body.width,
		thickness: req.body.thickness,
		weight: req.body.weight,
		powerHandling: req.body.powerHandling,
		powerHandlingMin: req.body.powerHandlingMin,
		powerHandlingMax: req.body.powerHandlingMax	
	};

	Component.findByIdAndUpdate(componentId, updates, function(err, update) {
		if (err) return err;
		res.json(update);
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

// DELETE :id /components/update/:id
router.delete('/update/:id', function(req, res, next) {
	var componentId = req.params.id;

	query = Component.remove({ _id: componentId });
	query.exec(function(err, components) {
		if (err) return err;
		res.json({ status: 'Component deleted.' });
		next();
	});
});

module.exports = router;