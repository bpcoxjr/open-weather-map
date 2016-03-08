//declare an Angular module called 'OWMApp' & inject ngRoute as a dependency
angular.module('OWMApp', ['ngRoute']);
	.config(['$routeProvider', function($routeProvider){
		//when user request the root url(nothing after the /), respond w/ home.html template & use 'HomeCtrl' controller
		$routeProvider.when('/', {
			templateUrl : 'home.html',
			controller : 'HomeCtrl'
		});
	}])
	//declare a controller called 'HomeCtrl'
	.controller('HomeCtrl', function($scope) {

	});
