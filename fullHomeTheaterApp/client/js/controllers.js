'use strict'

var controllers = angular.module('homeTheaterApp.controllers', []);

controllers.controller('MainCtrl', [
	'$scope', 'Televisions', 'Amplifiers', 'Speakers', 'Components',
	function($scope, Televisions, Amplifiers, Speakers, Components) {
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

		$scope.tableHeaders = ['Design Name', 'Television', 'Speaker',
		'Amplifier', 'Cost', 'Performance', 'Reliability'];

		$scope.xVariable = $scope.axisValues[0];
		$scope.yVariable = $scope.axisValues[1];

		$scope.systemDesigns = [];
	}
]);