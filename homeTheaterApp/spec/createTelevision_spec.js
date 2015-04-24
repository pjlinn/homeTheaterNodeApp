/*
	200 - OK
	201 - "Create" (used with POST)
	400 - "Bad request" (Perhaps missing required parameters)
	401 - "Unauthorized" (Missing authentication parameters)
	403 - "Forbidden" (You were authenticated but lacking required privileges)
	404 - "404 Not Found"
*/
TEST_TELEVISIONS = [
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
	}
];


var frisby = require('../node_modules/frisby'); // Not sure if I need a full path for node to find frisby

var URL = 'http://localhost:3000/televisions';

var inputSchema = {
	type: String,
	quantity: Number
};

var outputSchema = {
	type: String,
	quantity: Number
};

frisby.create('DELETE all televisions')
	.delete(URL)
	.expectStatus(200)
	.expectHeader('Content-type', 'application/json; charset=utf-8')
	.expectJSON({
		status: 'Successfully deleted all televisions'
	})
	.toss();

TEST_TELEVISIONS.forEach(function createTelevision(television, index, array) {
	frisby.create('POST create television ' + television.brand)
		.post(URL,
			{ 
				component: television.component,
			  	brand: television.brand,
			  	cost: television.cost,
			  	performance: television.performance,
			  	reliability: television.reliability,
			  	height: television.height,
			  	width: television.width,
			  	thickness: television.thickness,
			  	weight: television.weight,
			  	inputs: television.inputs,
			  	outputs: television.outputs
			})
		.expectStatus(201)
		.expectHeader('Content-type', 'application/json; charset=utf-8')
		.expectJSON({
				component: television.component,
			  	brand: television.brand,
			  	cost: television.cost,
			  	performance: television.performance,
			  	reliability: television.reliability,
			  	height: television.height,
			  	width: television.width,
			  	thickness: television.thickness,
			  	weight: television.weight,
			  	inputs: television.inputs,
			  	outputs: television.outputs
		})
		.toss()
});

frisby.create('GET one lg television without the extra properties')
	.get(URL + '/getOneLg')
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
		  	outputs: []		
	})
	.toss();


// frisby.create('GET lg television')
// 	.get(URL + '/getOneLg')
// 	.expectStatus(200)
// 	.expectJSONTypes({
// 		component: String,
// 		brand: String,
// 		cost: Number,
// 		performance: Number,
// 		reliability: Number,
// 		height: Number,
// 		width: Number,
// 		thickness: Number,
// 		weight: Number,
// 		inputs: [inputSchema],
// 		outputs: [outputSchema]
// 	})
// 	.expectJSON({
// 		component: 'television',
// 		brand: 'lg',
// 		cost: 1300,
// 		performance: 5,
// 		reliability: 0.7,
// 		height: 30.8,
// 		width: 50.6,
// 		thickness: 1.2,
// 		weight: 48.7,
// 		inputs: [
// 			{
// 				type: 'ac power',
// 				quantity: 1
// 			},
// 			{
// 				type: 'hdmi',
// 				quantity: 1
// 			},
// 			{
// 				type: 'video',
// 				quantity: 1
// 			}],
// 		outputs: [
// 			{
// 				type: 'audio-l',
// 				quantity: 1
// 			},
// 			{
// 				type: 'audio-r',
// 				quantity: 1
// 			}, 
// 			{
// 				type: 'headphones',
// 				quantity: 1
// 			}]
// 	})
// 	.toss()