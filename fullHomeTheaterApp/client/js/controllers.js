'use strict'

/*
	Calls the services and attaches the 
	data to the scope for the attached view. Also,
	creates values for options, tableheaders, etc.

	Makes the index.html cleaner.
*/

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

		// field has to match the object property being loaded in 
		var columnDefs = [
	  	    { displayName: "Design Name", field: "name", width: 100},
    		{ displayName: "Television", field: "television", width: 100 },
    		{ displayName: "Speaker", field: "speaker", width: 100 },
    		{ displayName: "Amplifier", field: "amplifier" },
    		{ displayName: 'Cost', field: 'cost', valueGetter: 'data.cost.toFixed(2)' },
    		{ displayName: 'Performance', field: 'performance', valueGetter: 'data.performance.toFixed(2)' },
    		{ displayName: 'Reliability', field: 'reliability', valueGetter: 'data.reliability.toFixed(2)' }
		];

		$scope.gridOptions = {
			columnDefs: columnDefs,
			rowData: null,
			enableSorting: true,
			dontUseScrolls: true,
			rowSelection: 'single'
		};
	}
]);