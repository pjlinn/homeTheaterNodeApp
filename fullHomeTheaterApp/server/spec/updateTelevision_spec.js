/*

	To run: jasmine-node updateTelevision....spec

	PUT new information for an existing amplifier

	*Fails because the fixed id doesn't exist

*/

var frisby = require('../node_modules/frisby');
var id = '553c3c90c0541225496a8481';
var URL = 'http://localhost:3000/televisions/' + id;

frisby.create('PUT new values for a television with the specified id')
	.put(URL, 
		{ brand: 'dell' }
	)
	.expectStatus(200)
	.expectHeader('Content-type', 'application/json; charset=utf-8')
	.expectJSON({
			component: 'television',
		  	brand: 'dell',
		  	cost: 1300,
		  	performance: 5,
		  	reliability: 0.7,
		  	height: 30.8,
		  	width: 50.6,
		  	thickness: 1.2,
		  	weight: 48.7,
		  	inputs: [{ type: 'ac power', quantity: 1 }, 
		  	{ type: 'hdmi', quantity: 1 },
		  	{ type: 'video', quantity: 1 }],
		  	outputs: []	
	})
	.toss();