/*

	To run: jasmine-node createAmplifier.spec

	DELETES all the amplifiers.
	POSTS the TEST_AMPLIFIERS
	GETS an amplifier to test

*/

TEST_AMPLIFIERS = [
	{
		component : "amplifier", brand : "bose", cost : 300,
		performance : 10, reliability : 0.8, powerHandling : 100,
		inputs : [
			{ type : "ac power", quantity : 1 },
			{ type : "audio-l", quantity : 1 },
			{ type : "audio-r", quantity : 1}
		],
		outputs : [{ type : "speaker-l", quantity : 1 },
			{ type : "speaker-r", quantity : 1 }
		]
	},
	{ component : "amplifier", brand : "polk", cost : 350,
	  performance : 8, reliability : 0.9, powerHandling : 175,
		inputs : [
			{ type : "ac power", quantity : 1 },
			{ type : "audio-l", quantity : 1 },
			{ type : "audio-r", quantity : 1 }
		],
		outputs : [{ type : "speaker-l", quantity : 1 },
			{ type : "speaker-r", quantity : 1 }
		]
	},
	{
		component: "amplifier", brand : "klipsch", cost : 370,
		performance : 5, reliability : 0.7, powerHandling : 70,
		inputs : [
			{ type : "ac power", quantity : 1 },
			{ type : "audio-l", quantity : 1 },
			{ type : "audio-r", quantity : 1 }
		],
		outputs : [
			{ type : "speaker-l", quantity : 1 },
			{ type : "speaker-r", quantity : 1 }
		]
	}
];

var frisby = require('../node_modules/frisby');
var URL = 'http://localhost:3000/amplifiers';

frisby.create('DELETE all amplifiers')
	.delete(URL)
	.expectStatus(200)
	.expectHeader('Content-type', 'application/json; charset=utf-8')
	.expectJSON({ status : 'All amplifiers have been deleted.' })
	.toss();

TEST_AMPLIFIERS.forEach(function createAmplifier(amplifier, index, array) { 
	frisby.create('POST create amplifier ' + amplifier.brand)
		.post(URL, 
				{
					'component': amplifier.component,
					'brand': amplifier.brand,
					'cost': amplifier.cost,
					'performance': amplifier.performance,
					'reliability': amplifier.reliability,
					'powerHandling': amplifier.powerHandling,
					'inputs': amplifier.inputs,
					'outputs': amplifier.outputs
				})
		.expectStatus(201)
		.expectHeader('Content-type', 'application/json; charset=utf-8')
		.expectJSON(
			{
					'component': amplifier.component,
					'brand': amplifier.brand,
					'cost': amplifier.cost,
					'performance': amplifier.performance,
					'reliability': amplifier.reliability,
					'powerHandling': amplifier.powerHandling,
					'inputs': amplifier.inputs,
					'outputs': amplifier.outputs					
			})
		.toss()
});

frisby.create('GET a single amplifier')
	.get(URL + '/getOnePolk')
	.expectStatus(200)
	.expectHeader('Content-type', 'application/json; charset=utf-8')
	.expectJSON(
			{
				component: 'amplifier',
				brand: 'polk',
				cost: 350,
				performance: 8,
				reliability: .9,
				powerHandling: 175,
				inputs: [{ type: 'ac power', quantity: 1 },
				{ type: 'audio-l', quantity: 1 },
				{ type: 'audio-r', quantity: 1 }],
				outputs: [{ type: 'speaker-l', quantity: 1 },
				{ type: 'speaker-r', quantity: 1 }]
			})
	.toss();