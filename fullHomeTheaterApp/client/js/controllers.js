'use strict'

var controllers = angular.module('homeTheaterApp.controllers', []);

controllers.controller('MainCtrl', [
	'$scope', '$http', 'Televisions', 'Amplifiers', 'Speakers', 'Components',
	function($scope, $http, Televisions, Amplifiers, Speakers, Components) {
		$scope.test = 'Hello World';

		$scope.create = function() {
			alert("working");
		};

		/*
			Different ways to use services and parameters. I can define
			parameters in the service, or the query call. Since this is
			an object, I have to set array to false in the service query 
			call.
		*/
		$scope.televisions = Televisions.query({component: 'television'});
		$scope.amplifiers = Amplifiers.query();
		$scope.speakers = Speakers.query();
		$scope.components = Components.query();


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