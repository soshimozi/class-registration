const routes = ($routeProvider, $locationProvider) => {
    $routeProvider
        .when('/', {
            template: require('./views/home.html'),
            controller: 'HomeController',
            controllerAs: 'vm',
            label: 'Home'
        })
        .when('/class-registration', {
            template: require('./views/class-registration.html'),
            controller: 'ClassRegistrationController',
            controllerAs: 'vm',
            label: 'Registration'
        })
        .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
};

module.exports = routes;