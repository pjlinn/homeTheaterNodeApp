'use strict';

/*
	Where we attach views to controllers. Also,
	load the different files and dependencies.

	App is named here and loaded in index.html
*/

var app = angular.module('homeTheaterApp', [
	'ngRoute',
	'angularGrid',
	'homeTheaterApp.controllers',
	'homeTheaterApp.directives',
	'homeTheaterApp.services'
	]).
	config(['$routeProvider', function($routeProvider) { 
		$routeProvider.when('/home', 
		{
			templateUrl: '/client/partials/partial1.html',
			controller: 'MainCtrl'
		}
	);
		$routeProvider.when('/addComponentView', 
		{
			templateUrl: '/client/partials/partial2.html',
			controller: 'NewComponentCtrl'
		}
	);
		$routeProvider.when('/editComponentView',
		{
			templateUrl: '/client/partials/editComponentView.html',
			controller: 'MainCtrl'
		}
	);
		$routeProvider.otherwise(
		{
			redirectTo: '/home'
		}
	);
}]);