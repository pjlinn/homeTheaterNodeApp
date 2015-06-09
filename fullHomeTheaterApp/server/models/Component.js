/*
	Component model for televisions, amplifiers, and
	speakers. Uses additional model created for
	the imbedded objects.

	Needed a components collection to query for
	individual component types. I was using
	a collection for each before.
*/

var mongoose = require('mongoose');

var componentInputSchema = require('./ComponentInputSchema');
var componentOutputSchema = require('./ComponentOutputSchema')

var componentSchema = new mongoose.Schema({
	component: String,
	brand: String,
	cost: Number,
	performance: Number,
	reliability: Number,
	height: Number,
	width: Number,
	thickness: Number,
	weight: Number,
	powerHandling: Number,
	powerHandlingMin: Number,
	powerHandlingMax: Number,
	inputs: [componentInputSchema],
	outputs: [componentOutputSchema]
});

module.exports = mongoose.model('Component', componentSchema);