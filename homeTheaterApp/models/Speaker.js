var mongoose = require('mongoose');

var	speakerInputSchema = require('./SpeakerInputSchema.js');
var speakerOutputSchema = require('./SpeakerOutputSchema.js');

var SpeakerSchema = new mongoose.Schema({
	component : String,
	brand : String,
	cost: Number,
	performance : Number,
	reliability : Number,
	powerHandlingMin : Number,
	powerHandlingMax : Number,
	inputs : [speakerInputSchema],
	outputs : [speakerOutputSchema]
});

// Export the model
module.exports = mongoose.model('Speaker', SpeakerSchema);