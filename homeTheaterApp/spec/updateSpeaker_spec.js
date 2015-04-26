var frisby = require('../node_modules/frisby');
var id = '5539954adc501ef61aefdb3e'; // Subject to change when I run the create test because it creates 3 new components
var URL = 'http://localhost:3000/speakers/' + id;

frisby.create('PUT new values in the identified speaker')
	.put(URL, { brand: 'hewlett packard'})
	.expectStatus(200)
	.expectHeader('Content-type', 'application/json; charset=utf-8')
	.expectJSON({
		brand: 'hewlett packard'
	})
	.toss();