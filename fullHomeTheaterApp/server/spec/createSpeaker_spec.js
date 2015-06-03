/*

	TO-DO: Write out what the test is supposed to accomplish and how
	to run it for my own reference. I've already forgotten. This
	includes expected outcome!

*/

TEST_SPEAKERS = [
	{
		component: 'speaker', brand: 'sony', cost : 1000,
		performance:10, reliability: 0.8, powerHandlingMin: 5,
		powerHandlingMax: 2000,
		inputs: [
			{ type: 'speaker-r', quantity: 1},
			{ type: 'speaker-l', quantity: 1}
		],
		outputs: []
	},
	{
		component : "speaker", brand : "klipsch", cost : 300,
		performance : 5, reliability : 0.7, powerHandlingMin : 5,
		powerHandlingMax : 85,
		inputs : [
			{ type : "speaker-r", quantity : 1 },
			{ type : "speaker-l", quantity : 1 }],
		outputs : []
	},
	{
		component : "speaker", brand : "bose", cost : 328,
		performance : 10, reliability : 0.9, powerHandlingMin : 50,
		powerHandlingMax : 200,
		inputs : [
			{ type : "speaker-r", quantity : 1 },
			{ type : "speaker-l", quantity : 1 }],
		outputs : []
	}
];

var frisby = require('../node_modules/frisby');
var URL = 'http://localhost:3000/speakers';

frisby.create('DELETE all speakers')
	.delete(URL)
	.expectStatus(200)
	.expectHeader('Content-type', 'application/json; charset=utf-8')
	.expectJSON(
		{ status: 'Speakers have been deleted.'}
	)
	.toss();

TEST_SPEAKERS.forEach(function createSpeakers(speaker, index, array) {
	frisby.create('POST create speaker ' + speaker.brand)
		.post(URL,
			{
				component: speaker.component,
				brand: speaker.brand,
				cost: speaker.cost,
				performance: speaker.performance,
				reliability: speaker.reliability,
				powerHandlingMin: speaker.powerHandlingMin,
				powerHandlingMax: speaker.powerHandlingMax,
				inputs: speaker.inputs,
				outputs: speaker.outputs
			})
		.expectStatus(201)
		.expectHeader('Content-type', 'application/json; charset=utf-8')
		.expectJSON(
			{
				component: speaker.component,
				brand: speaker.brand,
				cost: speaker.cost,
				performance: speaker.performance,
				reliability: speaker.reliability,
				powerHandlingMin: speaker.powerHandlingMin,
				powerHandlingMax: speaker.powerHandlingMax,
				inputs: speaker.inputs,
				outputs: speaker.outputs		
			})
		.toss()
});

frisby.create('GET a sony speaker and return non-mongo properties')
	.get(URL + '/getOneSony')
	.expectStatus(200)
	.expectHeader('Content-type', 'application/json; charset=utf-8')
	.expectJSON({
		component: 'speaker',
		brand: 'sony',
		cost: 1000,
		performance: 10,
		reliability: .8,
		powerHandlingMin: 5,
		powerHandlingMax: 2000,
		inputs: [{ type: 'speaker-r', quantity: 1 },
			{ type: 'speaker-l', quantity: 1 }],
		outputs: []
	})
	.toss();