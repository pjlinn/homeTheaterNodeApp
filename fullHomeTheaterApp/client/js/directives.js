'use strict'

/*
	Awesome directive reference: 
	http://www.sitepoint.com/practical-guide-angularjs-directives-part-two/
*/


var directives = angular.module('homeTheaterApp.directives', []);

directives.directive('ngWelcome', function() {
	return {
		restrict: "E",
		template: "<div> Howdy there! You look splendid. </div>"
	}
});

// Form for adding a new component
directives.directive('componentForm', function() {
	return {
		restrict: "E",
		replace: true,
		templateUrl: "/client/partials/componentForm.html"
	}
});

// Form for editing an existing component
directives.directive('editComponentForm', function() {
	return {
		restrict: "E",
		replace: true,
		templateUrl: "/client/partials/editComponentForm.html"
	}
})

// Allocates space and draws the graph. Uses components build in
// the other directive.
directives.directive('ngD3Chart', function() {

	var margin = {left: 75, right: 300, top: 30, bottom: 50},
		height = 300 - margin.top - margin.bottom,
		width = 1400 - margin.left - margin.right;

	return {
		restrict: 'AE',
		replace: false,
		scope: {
			optionX: '=',
			optionY: '=',
			systemDesigns: '='
		},
		link: function(scope, element, attrs) {

			var tooltip = d3.select("#canvas")
				.append("div")
					.attr("class", "tooltip")
					.style("opacity", 0);

			var x = d3.scale.linear().range([0, width]);
			var y = d3.scale.linear().range([height, 0]);

			var xAxis = d3.svg.axis().scale(x)
				.orient("bottom");
			var yAxis = d3.svg.axis().scale(y)
				.orient("left");

			var svg = d3.select("#canvas")
				.append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
				.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top +")");

			svg.append("g")
					.attr("class", "xAxis")
					.attr("transform", "translate(0, " + height + ")");

			svg.append("g")
					.attr("class", "yAxis");

			svg.append("text")
				.attr("class", "xLabel");

			svg.append("text")
				.attr("class", "yLabel");

			function visualizeIt() {
			
				var xVariable = scope.optionX.value;
				var yVariable = scope.optionY.value;

				scope.systemDesigns.forEach(function(d) {
					d.name = d.name;
					d.xVariable = d[xVariable];
					d.yVariable = d[yVariable];
				});

				x.domain([d3.min(scope.systemDesigns, function(d) { return d.xVariable; }) - 1, d3.max(scope.systemDesigns, function(d) { return d.xVariable; }) + 1]);
				y.domain([d3.min(scope.systemDesigns, function(d) { return d.yVariable; }) - 1, d3.max(scope.systemDesigns, function(d) { return d.yVariable; }) + 1]);

				var circle = svg.selectAll("circle")
					.data(scope.systemDesigns);

				circle.exit().remove();

				circle.enter().append("circle")
					.attr("r", 5)
					.on("mouseover", function(d) {
						tooltip.transition()
							.duration(200)
							.style("opacity", .9);
						tooltip.html(d.name)
							.style("left", (d3.event.pageX + 5) + "px")
							.style("top", (d3.event.pageY - 28) + "px");
					})
					.on("mouseout", function(d) {
						tooltip.transition()
							.duration(500)
							.style("opacity", 0);
					});

				circle
					.attr("cx", function(d) { return x(d.xVariable); })
					.attr("cy", function(d) { return y(d.yVariable); });

				svg.select('.xAxis')
					.call(xAxis);

				svg.select('.yAxis')
					.call(yAxis);

				svg.select(".xLabel")
					.attr("x", width - 100)
					.attr("y", height + margin.bottom)
					.attr("dy", "-.5em")
					.style("text-anchor", "middle")
					.text(xVariable);

				svg.select(".yLabel")
					.attr("transform", "rotate(-90)")
					.attr("y", 0 - margin.left)
					.attr("x", 0 - (height / 2))
					.attr("dy", "1em")
					.style("text-anchor", "middle")
					.text(yVariable);
			};

			d3.select("#visualizeBtn").on("click", visualizeIt);
		}
	};
});



// Algorithm to build the components. Probably not ideal how
// I break up the logic.
directives.directive('ngBuildSystems', function() {

	// var columnDefs = [
 //  	    { displayName: "Design Name", field: "designName" },
	// 	{ displayName: "Television", field: "television"},
	// 	{ displayName: "Speaker", field: "speaker" },
	// 	{ displayName: "Amplifier", field: "amplifier" },
	// 	{ displayName: 'Cost', field: 'cost' },
	// 	{ displayName: 'Performance', field: 'performance' },
	// 	{ displayName: 'Reliability', field: 'reliability' }
	// ];

	return {
		restrict: 'A',
		replace: false,
		scope: {
			components: '=',
			systemDesigns: '=',
			gridOptions: '='
		},
		link: function(scope, element, attrs) {

			function buildSystemDesigns(components) {

				var componentsArray = [];
				var televisionsArray = [];
				var speakersArray = [];
				var amplifersArray = [];

				components.forEach(function(component) {

					componentsArray.push(component.component);
					if (component.component == 'television') { televisionsArray.push(
							{
								'brand': component.brand,
								'cost': component.cost,
								'performance': component.performance,
								'reliability': component.reliability
							}
						);
					};
					if (component.component == 'speaker') { speakersArray.push(
							{
								'brand': component.brand,
								'cost': component.cost,
								'performance': component.performance,
								'reliability': component.reliability
							}
						);
					};
					if (component.component == 'amplifier') { amplifersArray.push(
							{
								'brand': component.brand,
								'cost': component.cost,
								'performance': component.performance,
								'reliability': component.reliability
							}
						);
					};									
				});

				buildSystems(televisionsArray, amplifersArray, speakersArray);
			};

			function buildSystems(televisions, amplifiers, speakers) {
				var sum = 0;
				var performance = 0;
				var reliability = 0;
				var counter = 1;

				for (var i = televisions.length - 1; i >= 0; i--) { // Loop through television container array
					for (var j = amplifiers.length - 1; j >= 0; j--) { // Loop through amplifier container array
						for (var k = speakers.length - 1; k >= 0; k--) { // Loop through speaker container array
							sum = televisions[i].cost + amplifiers[j].cost + speakers[k].cost;
							performance = (televisions[i].performance + amplifiers[j].performance + speakers[k].performance) / 3;
							reliability = (televisions[i].reliability + amplifiers[j].reliability + speakers[k].reliability) / 3;
							scope.systemDesigns.push( // Add system design object to system design container array
								{
									"name" : "design " + counter,
									"cost" : sum,
									"performance" : performance,
									"reliability" : reliability,
									"television" : televisions[i].brand,
									"amplifier" : amplifiers[j].brand,
									"speaker" : speakers[k].brand
								}
							);

							counter++;
						};
					};
				};

				// scope.systemDesigns.forEach(function(sysDesign) {
				// 	scope.gridOptions.api.setRows(sysDesign);
				// });
				scope.gridOptions.rowData = scope.systemDesigns;
				scope.gridOptions.api.onNewRows();

				// scope.systemDesigns.forEach(function(x) {
				// 	$("#designsTable").append("<tr><td>" + 
				// 		x.name + "</td><td>" + 
				// 		x.television + "</td><td>" + 
				// 		x.speaker + "</td><td>" + 
				// 		x.amplifier + "</td><td>"+
				// 		x.cost + "</td><td>" +
				// 		x.performance.toFixed(2) + "</td><td>" +
				// 		x.reliability.toFixed(2) +	"</td></tr>");
				// });
			};

			scope.$watch('components', function(newVal, oldVal) {
				if (newVal != undefined && newVal != '[]') {
					buildSystemDesigns(newVal);
				}
			});	
		}
	};
});