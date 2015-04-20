var mongoose = require('mongoose');

var SpeakerOutputSchema = new mongoose.Schema({
	type: String,
	quantity: Number
});

mongoose.exports = SpeakerOutputSchema;