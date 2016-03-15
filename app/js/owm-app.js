//declare Angular module called 'OWMApp' & inject ngRoute as a dependency
angular.module( 'OWMApp', ['ngRoute', 'ngAnimate'] )

    .value( 'owmCities', [
        'New York',
        'Dallas',
        'Chicago',
    ])

    .config(function( $routeProvider ) {
        $routeProvider
            .when( '/', { //when root url requested(nothing after /) respond w/ home.html & HomeCtrl
                templateUrl: 'home.html',
                controller: 'HomeCtrl as home'
            })
            .when( '/error', { template: '<p>Error: Page not found</p>' }) //use template property to supply in-line template error page
            .when( '/cities/:city', { //when /city url requested respond w/ city.html & CityCtrl
                templateUrl: 'city.html',
                controller: 'CityCtrl',
                resolve: {
                    city: function( owmCities, $route, $location ) {
                        var city = $route.current.params.city;

                        if ( owmCities.indexOf( city ) === -1 ) { //if city not found throw error
                            $location.path( '/error' ); //use $location service to redirect to error page if matching city not found
                            return;
                        }
                        return city;
                    }
                }
            })

            .otherwise({ redirectTo: '/error' });
    })
    //if route not found or resolver fails, redirect to error route
    .run(function($rootScope, $location, $timeout) {
        $rootScope.$on('$routeChangeError', function() {
            $location.path("/error");
        });
        $rootScope.$on('$routeChangeStart', function() {
            $rootScope.isLoading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function() {
          $timeout(function() {
            $rootScope.isLoading = false;
          }, 1000);
        });
    })

    //declare a controller called HomeCtrl
    .controller( 'HomeCtrl', function( $scope ) {
        this.welcomeMessage = 'Welcome home';
    })
    //declare a controller called CityCtrl
    .controller( 'CityCtrl', function( $scope, city ) { //city parameter refers to line 12
        $scope.city = city;
    });