var mongoose = require('mongoose');

var tvInputSchema = require('./TvInput.js');
var tvOutputSchema = require('./TvOutput.js');

var TelevisionSchema = new mongoose.Schema({
	component: String,
	brand: String,
	cost: Number,
	performance: Number,
	reliability: Number,
	height: Number,
	width: Number,
	thickness: Number,
	weight: Number,
	/*
		So you can just set inputs and outputs as arrays like I
		did in the commented out section below; however, there
		will be no control over what type of objects are pushed
		into the array. If you use pre-defined schema, the array
		will only capture the properties from the pre-defined 
		schema and ignore all others. Pretty cool actually.
	*/
	inputs: [tvInputSchema],
	outputs: [tvOutputSchema]
	// inputs: [],
	// outputs: []
});

module.exports = mongoose.model('Television', TelevisionSchema);