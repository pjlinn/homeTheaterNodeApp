/*

	TO-DO: Write out what the test is supposed to accomplish and how
	to run it for my own reference. I've already forgotten. This
	includes expected outcome!

*/

var frisby = require('../node_modules/frisby');
var id = '5539a0fd39a32ae11d629894'; // Subject to change when I run the create test because it creates 3 new components
var URL = 'http://localhost:3000/amplifiers/' + id;

frisby.create('PUT new values in the identified amplifier')
	.put(URL, { brand: 'starbucks'})
	.expectStatus(200)
	.expectHeader('Content-type', 'application/json; charset=utf-8')
	.expectJSON({
		brand: 'starbucks'
	})
	.toss();