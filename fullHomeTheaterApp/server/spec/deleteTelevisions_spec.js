/*

	TO-DO: Write out what the test is supposed to accomplish and how
	to run it for my own reference. I've already forgotten. This
	includes expected outcome!

*/

var frisby = require('frisby');
var URL = 'http://localhost:3000/televisions'

frisby.create('DELETE all televisions')
	.delete(URL)
	.expectStatus(200)
	.expectHeader('Content-type', 'application/json; charset=utf-8')
	.expectJSON({
		status: 'Successfully deleted all televisions'
	})
	.toss();
