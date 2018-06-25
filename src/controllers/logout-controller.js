export default class {
    constructor($rootScope, $location) {
        // TODO do actual logout here
        $rootScope.scopes = ['login'];

        $location.path('home');
    }
}