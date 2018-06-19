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
    'ngTouch'
]);

app.controller('HomeController', HomeController);
app.controller('ClassRegistrationController', ClassRegistrationController);

app.config(require('./routes'));


app.run(($browser) => {
    $browser.baseHref = function () { return "/" };
});