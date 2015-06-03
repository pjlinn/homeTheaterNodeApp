var mongoose = require('mongoose');

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
	inputs: [],
	outputs: []
});

module.exports = mongoose.model('Component', componentSchema);