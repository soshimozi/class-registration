const routes = ($routeProvider) => {

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
        .when('/profile', {
            template: require('./views/profile.html'),
            controller: 'ProfileController',
            controllerAs: 'vm',
            label: 'Profile'
        })
        .when('/admin', {
            template: require('./views/admin.html'),
            controller: 'AdminController',
            controllerAs: 'vm',
            label: 'Administration'
        })
        .when('/login', {
            template: require('./views/login.html'),
            controller: 'LoginController',
            controllerAs: 'vm',
            label: 'Login'
        })
        .otherwise({ redirectTo: '/' });

    //$locationProvider.html5Mode(true);
};

module.exports = routes;