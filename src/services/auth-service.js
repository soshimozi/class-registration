const authService = ($location, $timeout, angularAuth0) => {

    function login() {
        console.log('angularAuth0', angularAuth0);
        angularAuth0.authorize();
    }

    function adminLogin() {
        angularAuth0.baseOptions.scope = "openid profile email";
    }

    function handleAuthentication() {

        console.log('authentication!');

        angularAuth0.parseHash(function(err, authResult) {

            $location.hash('');

            if (authResult && authResult.accessToken && authResult.idToken) {
                setSession(authResult);
                $location.path('');


            } else if (err) {

                $timeout(function() {
                    $location.path('');
                });

                // TODO: do some better error handling here
                console.log(err);
                alert('Error: ' + err.error + '. Check the console for further details.');
            } else {
                console.log('not authenticated');
            }
        });
    }

    function setSession(authResult) {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

        console.log('setSession', authResult);
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    function logout() {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        $location.path('');
    }

    function isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        let isAuthenticated = new Date().getTime() < expiresAt;

        console.log('isAuthenticated', isAuthenticated);

        return isAuthenticated;
    }

    return {
        login: login,
        handleAuthentication: handleAuthentication,
        logout: logout,
        isAuthenticated: isAuthenticated
    }
};

authService.$inject = ['$location', '$timeout', 'angularAuth0'];

module.exports = authService;