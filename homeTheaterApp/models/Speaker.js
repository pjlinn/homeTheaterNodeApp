var mongoose = require('mongoose');

var	speakerInputSchema = require('./SpeakerInputSchema.js')

var SpeakerSchema = new mongoose.Schema({
	component : String,
	brand : String,
	performance : Number,
	reliability : Number,
	powerHandlingMin : Number,
	powerHandlingMax : Number,
	inputs : [speakerInputSchema],
	outputs : []
});

// Export the model
module.exports = mongoose.model('Speaker', SpeakerSchema);