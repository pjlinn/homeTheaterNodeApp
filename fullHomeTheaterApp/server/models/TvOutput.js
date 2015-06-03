var mongoose = require('mongoose');

var TvInputSchema = new mongoose.Schema({
	type: String,
	quantity: Number
});


/*
	No clue if this will work. Opposite of what I did with the
	tvoutputschema which I exports the model. I don't know if
	I need to make all the schemas models or just the television
	that inherits them.
*/
module.exports = TvInputSchema;