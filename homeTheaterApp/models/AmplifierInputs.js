var mongoose = require('mongoose');

var AmplifierInputSchema = new mongoose.Schema({
	type: String,
	quantity: Number
});

// Export the Schema
module.exports = AmplifierInputSchema;