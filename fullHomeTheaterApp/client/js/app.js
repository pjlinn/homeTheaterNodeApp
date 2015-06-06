'use strict';

var app = angular.module('homeTheaterApp', [
	'ngRoute',
	'homeTheaterApp.controllers',
	'homeTheaterApp.directives',
	'homeTheaterApp.services'
	]).
	config(['$routeProvider', function($routeProvider) { 
		$routeProvider.when('/view1', 
		{
			templateUrl: '/client/partials/partial1.html',
			controller: 'MainCtrl'
		}
	);
		$routeProvider.when('/view2', 
		{
			templateUrl: '/client/partials/partial2.html',
			controller: 'MainCtrl'
		}
	);
		$routeProvider.otherwise(
		{
			redirectTo: '/view1'
		}
	);
}]);