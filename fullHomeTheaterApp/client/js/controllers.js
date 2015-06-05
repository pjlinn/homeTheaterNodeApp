'use strict'

var controllers = angular.module('homeTheaterApp.controllers', []);

controllers.controller('MainCtrl', [
	'$scope', '$http', 'Televisions', 'Amplifiers', 'Speakers',
	function($scope, $http, Televisions, Amplifiers, Speakers) {
		$scope.test = 'Hello World';

		$scope.create = function() {
			alert("working");
		};

		$scope.televisions = Televisions.query();

		$scope.amplifiers = Amplifiers.query();

		$scope.speakers = Speakers.query();

		// $http.get('/televisions/')
		// 	.success(function(data) {
		// 		$scope.televisions = data;
		// 		console.log(data);
		// 	})
		// 	.error(function(data) {
		// 		console.log('Error: ' + data);
		// 	});
	}
]);