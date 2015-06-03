'use strict'

var controllers = angular.module('homeTheaterApp.controllers', []);

controllers.controller('MainCtrl', [
	'$scope', 
	function($scope) {
		$scope.test = 'Hello World';
	}
]);