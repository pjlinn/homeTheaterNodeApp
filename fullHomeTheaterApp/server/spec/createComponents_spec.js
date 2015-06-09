/*
	200 - OK
	201 - "Create" (used with POST)
	400 - "Bad request" (Perhaps missing required parameters)
	401 - "Unauthorized" (Missing authentication parameters)
	403 - "Forbidden" (You were authenticated but lacking required privileges)
	404 - "404 Not Found"
*/
/*
	To run: jasmine-node createComponents.spec

	DELETE all components in DB
	POST a component from TEST_COMPONENTS
	GET a speaker to test the POST
	
*/

TEST_COMPONENTS = [
	{
		component: 'television', brand: 'lg', cost: 1300, 
		performance: 5, reliability: 0.7, height: 30.8,
		width: 50.6, thickness: 1.2, weight: 48.7,
		inputs: [
			{ type: 'ac power', quantity: 1 }, 
			{ type: 'hdmi', quantity: 1 }, 
			{ type: 'video',quantity: 1 }],
		outputs: [
			{ type: 'audio-l', quantity: 1 },
			{ type: 'audio-r', quantity: 1}, 
			{ type: 'headphones', quantity: 1}]
	},
	{
		component: 'television', brand: 'samsung', cost: 1650,
		performance: 8, reliability: 0.8, height: 29,
		width: 49.3, thickness: 1.2, weight: 35.7,
		inputs: [
			{ type: 'ac power', quantity: 1 }, 
			{ type: 'hdmi',	quantity: 1 }, 
			{ type: 'video', quantity: 1}],
		outputs: [
			{ type: 'audio-l', quantity: 1 },
			{ type: 'audio-r', quantity: 1 }, 
			{ type: 'headphones', quantity: 1 
			// workit: true // testing to see if this shows up -- not part of the schema
		}]
	},
	{
		component: 'television', brand: 'sony', cost: 1200, 
		performance: 10, reliability: 0.9, height: 30.4,
		width: 50, thickness: 1.6, weight: 44.5, inputs: [
			{ type: 'ac power', quantity: 1 }, 
			{ type: 'hdmi', quantity: 1	}, 
			{ type: 'video', quantity: 1}],
		outputs: [{	type: 'audio-l', quantity: 1 },
			{ type: 'audio-r', quantity: 1 }, 
			{ type: 'headphones', quantity: 1}]	
	},
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
	},
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

var frisby = require('../node_modules/frisby')
var URL = 'http://localhost:3000/components';
var urlTelevision = URL + '/television';
var urlAmplifier = URL + '/amplifier';
var urlSpeaker = URL + '/speaker';

frisby.create('DELETE all components')
	.delete(URL)
	.expectStatus(200)
	.expectHeader('Content-type', 'application/json; charset=utf-8')
	.expectJSON({
		status: 'All components deleted.'
	})
	.toss();

TEST_COMPONENTS.forEach(function createComponent(component, index, array) {
	frisby.create('POST new component ' + component.component + ' ' + component.brand)
	.post(URL, {
		component: component.component,
	  	brand: component.brand,
	  	cost: component.cost,
	  	performance: component.performance,
	  	reliability: component.reliability,
	  	height: component.height,
	  	width: component.width,
	  	thickness: component.thickness,
	  	weight: component.weight,
		powerHandlingMin: component.powerHandlingMin,
		powerHandlingMax: component.powerHandlingMax,
		powerHandling: component.powerHandling,
	  	inputs: component.inputs,
	  	outputs: component.outputs		
	})
	.expectStatus(201)
	.expectHeader('Content-type', 'application/json; charset=utf-8')
	.toss()
});

frisby.create('GET a speaker using the params')
	.get(urlSpeaker)
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

frisby.create('GET a television using the params')
	.get(urlTelevision)
	.expectStatus(200)
	.expectHeader('Content-type', 'application/json; charset=utf-8')
	.expectJSON({
		component: 'television',
	  	brand: 'lg',
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
	  	outputs: [{ type: 'audio-l', quantity: 1 },
	  	{ type: 'audio-r', quantity: 1},
		{ type: 'headphones', quantity: 1}]		
	})
	.toss();

frisby.create('GET an amplifier using the params')
	.get(urlAmplifier)
	.expectStatus(200)
	.expectHeader('Content-type', 'application/json; charset=utf-8')
	.expectJSON({
		component: 'amplifier',
		brand: 'bose',
		cost: 300,
		performance: 10,
		reliability: .8,
		powerHandling: 100,
		inputs: [{ type: 'ac power', quantity: 1 },
		{ type: 'audio-l', quantity: 1 },
		{ type: 'audio-r', quantity: 1 }],
		outputs: [{ type: 'speaker-l', quantity: 1 },
		{ type: 'speaker-r', quantity: 1 }]		
	})
	.toss();