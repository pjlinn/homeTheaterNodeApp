/*
	New schema to define the inputs. Otherwise,
	everything is stored as a String.
*/

var mongoose = require('mongoose');

var ComponentInputSchema = new mongoose.Schema({
	type: String,
	quantity: Number
});

module.exports = ComponentInputSchema;