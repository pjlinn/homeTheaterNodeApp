var mongoose = require('mongoose');

var amplifierInputSchema = require('./AmplifierInputs.js');
var amplifierOutputSchema = require('./AmplifierOutputs.js');

var AmplifierSchema = new mongoose.Schema({
	component: String,
	brand: String,
	cost: Number,
	performance: Number,
	reliability: Number,
	powerHandling: Number,
	inputs: [amplifierInputSchema],
	outputs: [amplifierOutputSchema]
});

// Export the model
module.exports = mongoose.model('Amplifier', AmplifierSchema);