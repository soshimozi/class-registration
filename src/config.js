import clientConfig from './auth-client-config.js'

const config = ($routeProvider, $locationProvider, $httpProvider, angularAuth0Provider) => {

    let config = new clientConfig();

    $routeProvider
        .when('/', {
            template: require('./views/home.html'),
            controller: 'HomeController',
            controllerAs: 'vm',
            label: 'Home',
            scopes: []
        })
        .when('/class-registration', {
            template: require('./views/class-registration.html'),
            controller: 'ClassRegistrationController',
            controllerAs: 'vm',
            label: 'Registration',
            scopes: []
        })
        .when('/profile', {
            template: require('./views/profile.html'),
            controller: 'ProfileController',
            controllerAs: 'vm',
            label: 'Profile',
            scopes: ['profile openid']
        })
        .when('/admin', {
            template: require('./views/admin.html'),
            controller: 'AdminController',
            controllerAs: 'vm',
            label: 'Administration',
            scopes: ['profile openid']
        })
        .when('/login', {
            template: require('./views/login.html'),
            controller: 'LoginController',
            controllerAs: 'vm',
            label: 'Login',
            scopes: ['profile openid']
        })
        .when('/logout', {
            template: require('./views/logout.html'),
            controller: 'LogoutController',
            controllerAs: 'vm',
            label: 'Logout',
            requiresLogin: false,
            scopes: ['profile openid']
        })
        .when('/callback', {
            template: require('./views/callback.html'),
            controller: 'CallbackController',
            controllerAs: 'vm',
            label: 'Logout',
            requiresLogin: false,
            scopes: []
        })
        .otherwise({ redirectTo: '/' });

    angularAuth0Provider.init({
        clientID: config.AUTH0_CLIENT_ID, // 'laPrkxon9X91heaK5rcvf2E41VXzXGmc',
        domain: config.AUTH0_DOMAIN, // 'centeredyogadance.auth0.com',
        responseType: 'token id_token',
        audience: `https://${config.AUTH0_DOMAIN}/userinfo`,
        redirectUri: config.AUTH0_CALLBACK_URL, // 'http://localhost:8080/callback',
        scope: 'openid profile email'
    });

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(() => {
        return {
            request: (config) => {
                let token = localStorage.getItem("access_token");
                if (token) {
                    config.headers["Authorization"] = "Bearer " + token;
                }

                return config;
            },


            responseError: () => {
                // do something with error
            }
        };
    });

};

module.exports = config;