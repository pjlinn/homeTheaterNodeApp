/*

	To run: jasmine-node deleteSpeaker_spec.js

	DELETE all speakers from the DB

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