//declare an Angular module called 'OWMApp' & inject ngRoute as a dependency
angular.module('OWMApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', { //when user requests the root url(nothing after the /), respond w/ home.html template & use 'HomeCtrl' controller
            templateUrl : 'home.html',
            controller : 'HomeCtrl'
        }).when('/cities/:city', { //when user requests the url ending in /city, respond w/ city.html template & use 'CityCtrl' controller
        	templateUrl : 'city.html',
        	controller : 'CityCtrl'
        	resolve: {
        		city: function(owmCities, $route, $location) {
        			var city = $route.current.params.city; 
        			if(owmCities.indexOf(city) === -1){ //if city not found throw an error
        				$location.path('/error'); //use the $location service to redirect to the error page when matching city not found
        				return;
        			}
        			return city;
        		}
        	}
        	.when('/error', {
        		template : '<p>Error - Page Not Found</p>' //use template property to supply an in-line template error page(not a best practice, just for example)
        	})
        	.run(function($rootScope, $location){ //if route not found or resolver fails, redirect to /error route
        		$rootScope.$on('$routeChangeError', function() {
        			$location.path('/error');
        		})
        	});
        });
    }])
    //declare a controller called 'HomeCtrl'
    .controller('HomeCtrl', function($scope) {
        //empty for now
    })
    //declare a controller called 'CityCtrl'
    .controller('CityCtrl', function($scope, city) { //city refers to line 12
    	$scope.city = city; 
    }]);

    .value('owmCities', ['New York', 'Dallas', 'Chicago'])