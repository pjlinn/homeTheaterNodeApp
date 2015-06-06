'use strict'

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