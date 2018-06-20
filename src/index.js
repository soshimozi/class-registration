import './styles/styles.less';
import '../node_modules/fullcalendar/dist/fullcalendar.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import './styles/gallery.less';

/* controllers */
import HomeController from './controllers/home-controller';
import ClassRegistrationController from './controllers/class-registration-controller';

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

const app = angular.module('calendar-app', [
    'ngRoute',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    require('angular-animate'),
    'ui.calendar',
    'ui.utils.masks',
    'ngTouch',
    require('angular-breadcrumbs')
]);

app.controller('HomeController', HomeController);
app.controller('ClassRegistrationController', ClassRegistrationController);

app.config(require('./routes'));


app.run(($browser, $rootScope) => {
    $browser.baseHref = function () { return "/" };

    $rootScope.companyAddress = "32999 Yucaipa Boulevard, Suite 118, Yucaipa, California 92399, United States";
    $rootScope.companyPhone = "(909) 283-8046";
    $rootScope.companyName = "CENTERED YOGA & DANCE";
    $rootScope.companyTagLine = "UNITING MIND, BODY, AND SOUL";
    $rootScope.headerPhoto = require('./images/yoga-1.jpg');

    $rootScope.$on('$routeChangeStart', ($event, next, current) => {

        console.log('$routeChangeStart', $event, next, current)
        // ... you could trigger something here ...
    });

});