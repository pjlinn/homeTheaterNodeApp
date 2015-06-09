/*
	Schema for outputs. 
*/

var mongoose = require('mongoose');

var ComponentOutputSchema = new mongoose.Schema({
	type: String,
	quantity: Number
});

module.exports = ComponentOutputSchema;