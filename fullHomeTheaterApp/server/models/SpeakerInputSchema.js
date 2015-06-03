var mongoose = require('mongoose');

var SpeakerInputSchema = new mongoose.Schema({
	type: String,
	quantity: Number
});

// Export the Schema
module.exports = SpeakerInputSchema;