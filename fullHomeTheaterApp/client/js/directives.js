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

directives.directive('ngD3Chart', function() {
	var margin = {left: 75, right: 20, top: 30, bottom: 50},
		height = 300 - margin.top - margin.bottom,
		width = 1400 - margin.left - margin.right;

	return {
		restrict: 'AE',
		replace: false,
		link: function(scope, element, attrs) {

			function renderGraph(televisions) {
				function now() {
					alert(scope.televisions);
				};

				now();
			};
			renderGraph();
		}
	};
});