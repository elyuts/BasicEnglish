(function(angular) {
    var services = angular.module('basicEnglishServices', []);

    services.factory('userService', ['$http', function ($http) {
        return {
            login: function (username, password) {
                return $http.post('/login', {username: username, password: password });
            },
            logout: function () {
                return $http.get('/logout');
            }
        };
    }]);

}(angular));