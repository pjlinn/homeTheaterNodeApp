/*

	TO-DO: Write out what the test is supposed to accomplish and how
	to run it for my own reference. I've already forgotten. This
	includes expected outcome!

*/

var frisby = require('frisby');
var URL = 'http://localhost:3000/speakers';

frisby.create('DELETE all speakers')
	.delete(URL)
	.expectStatus(200)
	.expectHeader('Content-type', 'application/json; charset=utf-8')
	.expectJSON(
		{ status: 'Speakers have been deleted.'}
	)
	.toss();