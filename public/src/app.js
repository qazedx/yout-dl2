angular.module('youtApp', [])
.run(['GAuth', 'GApi', 'GData', '$state', '$rootScope',
    function(GAuth, GApi, Gdata, $state, $rootScope) {

        $rootScope.gdata = GData;

        var CLIENT = '1095932358118-6trmt0hgqbc9at3clre7582bqeprb2q1.apps.googleusercontent.com';
        var BASE = 'https://myGoogleAppEngine.appspot.com/_ah/api';

        GApi.load('myApiName','v1',BASE);
        GApi.load('calendar','v3'); // for google api (https://developers.google.com/apis-explorer/)

        GAuth.setClient(CLIENT);
        GAuth.setScope("https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly"); // default scope is only https://www.googleapis.com/auth/userinfo.email

        GAuth.checkAuth().then(
            function (user) {
                console.log(user.name + 'is login')
                $state.go('webapp.home'); // an example of action if it's possible to
                              // authenticate user at startup of the application
            },
            function() {
                $state.go('login');       // an example of action if it's impossible to
                      // authenticate user at startup of the application
            }
        );

    }
]);
