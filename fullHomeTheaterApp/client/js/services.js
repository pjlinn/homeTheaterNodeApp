'use strict'

/*
	Angular queries to the API routes I set up on the server side.
*/

var services = angular.module('homeTheaterApp.services', ['ngResource']);

services.factory('Televisions', ['$resource', function($resource) {
		return $resource('http://localhost:3000/components/:component', {}, {
			query: { method: 'GET', params: {}, isArray: false }
		});
	}
]);

services.factory('Amplifiers', ['$resource', function($resource) {
		return $resource('http://localhost:3000/components/amplifier', {}, {
			query: { method: 'GET', params: {}, isArray: false }
		});
	}
]);

services.factory('Speakers', ['$resource', function($resource) {
		return $resource('http://localhost:3000/components/speaker', {}, {
			query: { method: 'GET', params: {}, isArray: false }
		});
	}
]);

services.factory('Components', ['$resource', function($resource) {
		return $resource('http://localhost:3000/components', {}, {
			query: { method: 'GET', params: {}, isArray: true }
		});
	}
]);

/*
	Don't have internet so not positive what to do here. Definitely seeing
	problems with how the form is working. I create an array and then push
	an object, but I should create a component object outside of the array
	and then just push that new object. I don't think I want to 'POST' an
	array in this case. Just an object. Not sure how to do it so that
	the API gets it in the parameters. Need the internet.
*/
services.factory('HdTv', ['$resource', function($resource) {
		return $resource('http://localhost:3000/components', {}, {

		});
	}
]);