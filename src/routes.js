const routes = ($routeProvider) => {
    $routeProvider
        .when('/home', {
            template: require('./views/home.html'),
            controller: 'HomeController',
            controllerAs: 'vm',
        })
        .when('/register-class', {
            template: require('./views/class-registration.html'),
            controller: 'ClassRegistrationController',
            controllerAs: 'vm',
        })
        .otherwise({ redirectTo: '/home' });
};

module.exports = routes;