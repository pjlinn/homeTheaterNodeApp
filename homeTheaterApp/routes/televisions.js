var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Television = require('../models/Television.js');

var query;

// GET /televisions listing
router.get('/', function(req, res, next) {
	query = Television.find();
	query.select('-_id -__v');
	query.exec(function(err, televisions) {
		if (err) return next(err);
		res.json(televisions);
	});
});

// GET /televisions/getOne
router.get('/getOneLg', function(req, res, next) {
	query = Television.findOne({ brand: 'lg' });
	
	query.select('-_id -__v');
	query.exec(function (err, television) {
		if (err) { return err };
		res.json(television);
	});
});

// POST /televisions listing
router.post('/', function(req, res, next) {

	var television = new Television;
	
	television.component = television.brand = television.cost =
	television.performance = television.reliability = television.height =
	television.width = television.thickness = television.weight =
	television.inputs = television.outputs = undefined;

	television.component = req.body.component;
	television.brand = req.body.brand;
	television.cost = req.body.cost;
	television.performance = req.body.performance;
	television.reliability = req.body.reliability;
	television.height = req.body.height;
	television.width = req.body.width;
	television.thickness = req.body.thickness;
	television.weight = req.body.weight;
	television.inputs = req.body.inputs;
	television.outputs = req.body.outputs;
	// Not really necessary to add the inputs/outputs like this
	// var inputs  = req.body.inputs;
	// var outputs = req.body.outputs;

	// inputs.forEach(function postInput(input, index, array) {
	// 	television.inputs.push(input);
	// });

	// outputs.forEach(function postOutput(output, index, array) {
	// 	television.outputs.push(output);
	// });

	television.save(function (err, televisions) {
		if (err) {
			console.log("Mongoose error creating a new television");
			res.status(400);
			res.json({ error: err });
		} else {
			res.status(201);
			res.json(television);
		};
		/*
			Moved this 'next()' inside the save() function. I kept getting
			an error that I was trying to edit a heading that was already
			sent. Seemed to be a callback/async problem that I don't yet
			understand. This fixes that problem although I'm not sure if
			it is adequate.
		*/
		next(); 
	});
});

router.delete('/', function(req, res, next) {
	query = Television.remove({});
	query.exec(function(err) {
		res.json({status: 'Successfully deleted all televisions'});
		next();
	});
});

module.exports = router;

/*
	The versionKey is a property set on each document when 
	first created by Mongoose. This keys value contains the 
	internal revision of the document. The name of this document 
	property is configurable. The default is __v. If this 
	conflicts with your application you can configure 
	as such: http://mongoosejs.com/docs/guide.html#versionKey

[
    {
        "_id": "552b26aeda36eccd49eab811",
        "component": "amplifier",
        "brand": "bose",
        "cost": 300,
        "performance": 10,
        "reliability": 0.8,
        "__v": 0,
        "outputs": [
            {
                "type": "speaker-l",
                "quantity": 1,
                "_id": "552b26aeda36eccd49eab813"
            },
            {
                "type": "speaker-r",
                "quantity": 1,
                "_id": "552b26aeda36eccd49eab812"
            }
        ],
        "inputs": [
            {
                "type": "ac power",
                "quantity": 1,
                "_id": "552b26aeda36eccd49eab816"
            },
            {
                "type": "audio-l",
                "quantity": 1,
                "_id": "552b26aeda36eccd49eab815"
            },
            {
                "type": "audio-r",
                "quantity": 1,
                "_id": "552b26aeda36eccd49eab814"
            }
        ]
    }
]
*/