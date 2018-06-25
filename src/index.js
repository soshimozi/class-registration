import './styles/styles.less';
import '../node_modules/fullcalendar/dist/fullcalendar.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import './styles/gallery.less';

/* controllers */
import HomeController from './controllers/home-controller';
import ClassRegistrationController from './controllers/class-registration-controller';
import AdminController from './controllers/admin-controller';
import ProfileController from './controllers/profile-controller';
import LoginController from './controllers/login-controller';
import LogoutController from './controllers/logout-controller';
import CallbackController from './controllers/callback-controller';

// require('angular-animate');
require('bootstrap');
require('angular-ui-calendar');
require('angular-route');
require('angular-ui-bootstrap');
require('angular-input-masks');
require('underscore');
require('fullcalendar');
require('moment');
require('angular-touch');
require('angular-auth0');

const app = angular.module('calendar-app', [
    'ngRoute',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    require('angular-animate'),
    'ui.calendar',
    'ui.utils.masks',
    'ngTouch',
    require('angular-breadcrumbs'),
    'auth0.auth0'
]);

app.controller('HomeController', HomeController);
app.controller('ClassRegistrationController', ClassRegistrationController);
app.controller('AdminController', AdminController);
app.controller('ProfileController', ProfileController);
app.controller('LoginController', LoginController);
app.controller('LogoutController', LogoutController);
app.controller('CallbackController', CallbackController);

app.service('authService', require('./services/auth-service'));

app.config(require('./config'));


app.run(($browser, $rootScope, $templateCache, $location, authService) => {

    $browser.baseHref = function () { return "/" };

    $templateCache.put('breadcrumbs.html', require('./templates/breadcrumbs.html'));

    $rootScope.companyAddress = "32999 Yucaipa Boulevard, Suite 118, Yucaipa, California 92399, United States";
    $rootScope.companyPhone = "(909) 283-8046";
    $rootScope.companyName = "CENTERED YOGA & DANCE";
    $rootScope.companyTagLine = "UNITING MIND, BODY, AND SOUL";
    $rootScope.headerPhoto = require('./images/yoga-1.jpg');

    $rootScope.topLinks = [
        // {
        //     label: 'admin',
        //     page: 'admin',
        //     scope: ['admin']
        // },
        // {
        //     label: 'login',
        //     page: 'login',
        //     scope: ['login']
        // },
        // {
        //     label: 'profile',
        //     page: 'profile',
        //     scope: ['profile']
        // },
        // {
        //     label: 'logout',
        //     page: 'logout',
        //     scope: ['profile', 'admin']
        // }
    ];

    // // TODO: get scopes from users roles/authentication
    // $rootScope.scopes = ['login'];
    //
    // $rootScope.gotoPage = (pageName) => {
    //     $location.path(pageName);
    // };
    //
    // $rootScope.hasScope = (scope) => {
    //     if(scope == null && $rootScope.scopes.length == 0) return false;
    //
    //     let diff = underscore.difference(scope, $rootScope.scopes);
    //     return diff.length == 0;
    // };
    //
    // $rootScope.isOnPage = (pageName) => {
    //
    //     var currentPage = $location.$$path.replace(/^\/+/g, '');
    //     return (currentPage === pageName);
    // };
    $rootScope.login = () => {
        authService.login();
    };

    $rootScope.isAuthenticated = () => {
        return authService.isAuthenticated();
    };

    $rootScope.logout = () => {
        authService.logout();
    };

    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        console.log('next', next);

        // if(next && next.requiresLogin && !AuthService.isAuthenticated()) {
        //     console.log('preventing location change?');
        //     event.preventDefault();
        //     $location.path('/');
        // }
    });

    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
        console.log('route error');

        if (rejection === 'Unauthorized') {
            $location.path('/');
        }
    });

    $rootScope.authService = authService;

    authService.handleAuthentication();

});

