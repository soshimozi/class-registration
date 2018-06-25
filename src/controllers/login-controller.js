export default class {
    constructor($rootScope, $location, authService) {

        authService.login();

        // TODO do actual login here
        $rootScope.scopes = ['admin', 'profile'];
        $location.path('');
    }
}