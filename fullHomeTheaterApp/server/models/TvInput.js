var mongoose = require('mongoose');

var TvOutputSchema = new mongoose.Schema({
	type: String,
	quantity: Number
});

/*
	Not sure what I'm supposed to be exporting. I want to use 
	this Schema in the Television schema, but I don't know if
	I have to make it a model or not. Maybe I can just export
	the schema?
*/
// module.exports = mongoose.model('TvOutput', TvOutputSchema);\
module.exports = TvOutputSchema;