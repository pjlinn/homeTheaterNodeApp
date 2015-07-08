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

		/*
			Test
		*/
		// var testObject = new Components({component: 'hdtv'});
		// testObject.$save();
	
		// Need to use promise for the directive watch
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

controllers.controller('NewComponentCtrl', [
	'$scope', 'Components',
	function($scope, Components) {
		// For the options. Using objects is unnecessary in this case
		$scope.axisValues = [
			{ name:'Television', value:'television', index: 0},
			{ name:'Speaker', value:'speaker', index: 1},
			{ name:'Amplifier', value:'amplifier', index: 2}
		];

		$scope.inputsArray = [];
		$scope.outputsArray = [];
		$scope.componentsArray = [];
		$scope.newComponent = {};

		/*
			Inputs are stored as an array of objects. So this function
			pushes new object from the form into that array to be 
			POSTed later.
		*/
		$scope.addNewInput = function (type, quantity) {
			if (type !== undefined && quantity !== undefined &&
				type !== null && quantity !== null) {
				$scope.inputsArray.push({
					type: type,
					quantity: quantity
				});
				$scope.inputType = null;
				$scope.inputQuantity = null;				
			};
			console.log($scope.inputsArray);
		};

		/*
			Same as with inputs, outputs are stored as an array of 
			objects. Some logic was added to only submit if both
			values were provided and only clear the form after a 
			complete submission.
		*/
		$scope.addNewOutput = function (type, quantity) {
			if (type !== undefined && quantity !== undefined && 
				type !== null && quantity !== null) {
				$scope.outputsArray.push({
					type: type,
					quantity: quantity
				});
				$scope.outputType = null;
				$scope.outputQuantity = null;				
			};
			console.log($scope.outputsArray);
		};

		/*
			Need to create an object / array of objects to POST to
			the database. Similar checks added to make sure the form is
			cleared and correctly filled out. If one of the inputs is filled
			ther other becomes null instead of undefined so we need to account
			for both.
		*/		
		$scope.addNewComponent = function (
			component, brand, cost, performance, reliability, height,
			width, thickness, weight, powerHandling, powerHandlingMin,
			powerHandlingMax, inputs, outputs) {

			if (component !== undefined && brand !== undefined && cost !== undefined &&
				performance !== undefined && reliability !== undefined && 
				height !== undefined && width !== undefined && thickness !== undefined &&
				weight !== undefined && inputs.length !== 0 && outputs.length !== 0 && 
				component !== null && brand !== null && cost !== null &&
				performance !== null && reliability !== null && 
				height !== null && width !== null && thickness !== null &&
				weight !== null) {

				$scope.newComponent = {
					component: component.value,
					brand: brand,
					cost: cost,
					performance: performance,
					reliability: reliability,
					height: height,
					width: width,
					thickness: thickness,
					weight: weight,
					powerHandling: powerHandling,
					powerHandlingMin: powerHandlingMin,
					powerHandlingMax: powerHandlingMax,
					inputs: inputs,
					outputs: outputs					
				};


				// POST new component				
				var testObject = new Components($scope.newComponent);
				testObject.$save();

				$scope.componentsArray.push({ newComponent: $scope.newComponent });
				
				$scope.componentSelect = null;
				$scope.brand = null;
				$scope.cost = null;
				$scope.performance = null;
				$scope.reliability = null;
				$scope.height = null;
				$scope.width = null;
				$scope.thickness = null;
				$scope.weight = null;
				$scope.powerHandling = null;
				$scope.powerHandlingMin = null;
				$scope.powerHandlingMax = null; 	

			};
			console.log($scope.componentsArray);
		};
	}
]);