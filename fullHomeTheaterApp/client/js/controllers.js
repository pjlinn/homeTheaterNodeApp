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
	'$scope', 'Components', 'UpdateComponent',
	function($scope, Components, UpdateComponent) {
		// For the options. Using objects is unnecessary in this case
		$scope.componentTypes = [
			{ name:'Television', value:'television', index: 0},
			{ name:'Speaker', value:'speaker', index: 1},
			{ name:'Amplifier', value:'amplifier', index: 2}
		];

		$scope.clearForm = function() {
			$scope.componentId = null;
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
		}

		$scope.inputsArray = [];
		$scope.outputsArray = [];
		$scope.componentsArray = [];
		$scope.newComponent = {};
		$scope.componentInputs = [];
		$scope.componentOutputs = [];
		// Need to set this initially, otherwise appears as undefined and can't set the value
		$scope.setComponentSelect = function() {
			$scope.componentSelect = { value: $scope.componentTypes[0].value };
		};

		$scope.setComponentSelect();

		// Need to use promise for the directive watch
		$scope.populateList = function() {
			var componentResponse = Components.query();
			componentResponse.$promise.then(function(result) {
				$scope.components = result;
			});			
		}

		$scope.populateList();

		/*
			Few things -- this controller might not be the best one to use. Also,
			I can't use componentSelect until I click something with it. Weird,
			but once I set a value it is no longer undefined and changes. Need
			to build this out and change the buttons around.
		*/
		$scope.populateForm = function(component) {
			$scope.componentId = component._id;
			$scope.componentSelect.value = component.component;
			$scope.brand = component.brand;
			$scope.cost = component.cost;
			$scope.performance = component.performance;
			$scope.reliability = component.reliability;
			$scope.height = component.height;
			$scope.width = component.width;
			$scope.thickness = component.thickness;
			$scope.weight = component.weight;
			$scope.powerHandling = component.powerHandling;
			$scope.powerHandlingMin = component.powerHandlingMin;
			$scope.powerHandlingMax = component.powerHandlingMax;

			$scope.componentInputs = [];
			$scope.componentOutputs = [];

			// ng-repeat arrays for inputs/outputs
			component.inputs.forEach( function (input) {
				$scope.componentInputs.push(input);
			});

			component.outputs.forEach(function (output) {
				$scope.componentOutputs.push(output);
			});
		};

		/*
			Populate input text boxes for update and deletion
		*/
		$scope.populateInput = function(input) {
			$scope.inputType = input.type;
			$scope.inputQuantity = input.quantity;
		};

		/*
			Populate output text boxes for update and deletion
		*/
		$scope.populateOutput = function(output) {
			$scope.outputType = output.type;
			$scope.outputQuantity = output.quantity;
		};
		/*
			Clear input fields
		*/
		$scope.clearInputForm = function() {
			$scope.inputType = "";
			$scope.inputQuantity = "";			
		};
		/*
			Clear output fields
		*/
		$scope.clearOutputForm = function() {
			$scope.outputType = "";
			$scope.outputQuantity = "";			
		};

		/*
			DELETE component function for delete button
		*/
		$scope.deleteComponent = function(componentId) {
			var updateComponent = new UpdateComponent();
			updateComponent.$remove({ _id: componentId });
			$scope.clearForm();
			$scope.populateList();
			$scope.setComponentSelect();		
		};

		/*
			PUT updates to the component
		*/
		$scope.sendUpdates = function(componentId, component, brand, 
			cost, performance, reliability, height, width, thickness, 
			weight, powerHandling, powerHandlingMin, powerHandlingMax) {

			/*
				Real weird situation where the PUT command wouldn't update
				because some fields were empty and listed as undefined. So
				I have to do this check to set them to null. Probably should
				change how things are posted instead of checking this far down
				the line.
			*/
			if (component === undefined) { component = null; };
			if (brand === undefined) { brand = null; };
			if (cost === undefined) { cost = null; };
			if (performance === undefined) { performance = null; };
			if (reliability === undefined) { reliability = null; };
			if (height === undefined) { height = null; };
			if (width === undefined) { width = null; };
			if (thickness === undefined) { thickness = null; };
			if (weight === undefined) { weight = null; };
			if (powerHandling === undefined) { powerHandling = null; };
			if (powerHandlingMin === undefined) { powerHandlingMin = null; };
			if (powerHandlingMax === undefined) { powerHandlingMax = null; };

			var updates = {
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
				powerHandlingMax: powerHandlingMax				
			};

			UpdateComponent.update( { _id: componentId }, updates);
			$scope.clearForm();
			$scope.populateList();
			$scope.setComponentSelect();
		};

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

			// Form must be filled in completely
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
				var newComponent = new Components($scope.newComponent);
				// POST: /components {component: ..., brand: ...}
				newComponent.$save();

				$scope.componentsArray.push({ newComponent: $scope.newComponent });

				$scope.clearForm();	

			};
			console.log($scope.componentsArray);
		};
	}
]);