var mongoose = require('mongoose');

var AmplifierOutputSchema = new mongoose.Schema({
	type: String,
	quantity: Number
});

module.exports = AmplifierOutputSchema;