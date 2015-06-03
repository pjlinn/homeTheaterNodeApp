'use strict'

var directives = angular.module('homeTheaterApp.directives', []);

directives.directive('ngWelcome', function() {
	return {
		restrict: "E",
		template: "<div> Howdy there! You look splendid. </div>"
	}
});