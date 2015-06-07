'use strict'

var controllers = angular.module('homeTheaterApp.controllers', []);

controllers.controller('MainCtrl', [
	'$scope', '$http', 'Televisions', 'Amplifiers', 'Speakers', 'Components',
	function($scope, $http, Televisions, Amplifiers, Speakers, Components) {
		$scope.test = 'Hello World';

		/* 
			Function holder. It's logic is defined in a directive
		 	I think I'm supposed to keep the ctrl fairly clean
			I'm also not sure how to call a function defined in a
			directive. I'd have to move the button inside the 
			directive so that it would inherit the directives scope.
			I don't want to do that, however. So I will bind the
			directive to this function and define it there and have
			the button call it.
		*/
		// $scope.visualizeIt = function() { console.log('controller...')};

		/*
			Different ways to use services and parameters. I can define
			parameters in the service, or the query call. Since this is
			an object, I have to set array to false in the service query 
			call.
		*/
		$scope.televisions = Televisions.query({component: 'television'});
		$scope.amplifiers = Amplifiers.query();
		$scope.speakers = Speakers.query();
	
		// Need to use promise for the direvtive watch
		var componentResponse = Components.query();
		componentResponse.$promise.then(function(result) {
			$scope.components = result;
		});

		// For the options. Using objects is unnecessary in this case
		$scope.axisValues = [
			{ name:'Cost', value:'cost', index: 0},
			{ name:'Performance', value:'performance', index: 1},
			{ name:'Reliability', value:'reliability', index: 2}
		];

		$scope.xVariable = $scope.axisValues[0];
		$scope.yVariable = $scope.axisValues[1];

		$scope.systemDesigns = [];


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