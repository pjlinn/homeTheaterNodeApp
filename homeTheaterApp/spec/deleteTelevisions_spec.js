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
