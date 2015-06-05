'use strict'

var services = angular.module('homeTheaterApp.services', ['ngResource']);

services.factory('Televisions', ['$resource', function($resource) {
		return $resource('http://localhost:3000/televisions', {}, {
			query: { method: 'GET', params: {}, isArray: true }
		});
	}
]);

services.factory('Amplifiers', ['$resource', function($resource) {
		return $resource('http://localhost:3000/amplifiers', {}, {
			query: { method: 'GET', params: {}, isArray: true }
		});
	}
]);

services.factory('Speakers', ['$resource', function($resource) {
		return $resource('http://localhost:3000/speakers', {}, {
			query: { method: 'GET', params: {}, isArray: true }
		});
	}
]);