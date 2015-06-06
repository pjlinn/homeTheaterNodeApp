var mongoose = require('mongoose');

var ComponentInputSchema = new mongoose.Schema({
	type: String,
	quantity: Number
});

module.exports = ComponentInputSchema;