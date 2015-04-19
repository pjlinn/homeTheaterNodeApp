var mongoose = require('mongoose');

var SpeakerInputSchema = new mongoose.Schema({
	type : String,
	quantity : Number
});

mongoose.exports = SpeakerInputSchema;