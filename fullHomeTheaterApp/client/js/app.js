'use strict';

var app = angular.module('homeTheaterApp', [
	'ngRoute',
	'homeTheaterApp.controllers',
	'homeTheaterApp.directives'
	]).
	config(['$routeProvider', function($routeProvider) { 
		$routeProvider.when('/view1', 
		{
			templateUrl: 'partials/partial1.html',
			controllers: 'MainCtrl'
		}
	);
		$routeProvider.when('view2', 
		{
			templateUrl: 'partials/partial2.html',
			controllers: 'MainCtrl'
		}
	);
		$routeProvider.otherwise(
		{
			redirectTo: '/view1'
		}
	);
}]);