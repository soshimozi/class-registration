const routes = ($routeProvider, $locationProvider) => {
    $routeProvider
        .when('/', {
            template: require('./views/home.html'),
            controller: 'HomeController',
            controllerAs: 'vm',
        })
        .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
};

module.exports = routes;