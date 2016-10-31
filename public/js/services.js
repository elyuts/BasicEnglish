(function(angular) {
    const TOKEN_KEY = 'TOKEN_KEY';
    var services = angular.module('basicEnglishServices', []);

    services.factory('userService', ['$http', function ($http) {
        return {
            login: function (username, password) {
                return $http.post('/login', { username: username, password: password });
            },
            logout: function () {
                return $http.get('/logout');
            }
        };
    }]);

    services.factory('apiService', ['$http', function ($http) {
        return {
            getFullDictionary: function () {
                var req = {
                    method: 'GET',
                    url: '/api/getFullDictionary',
                    headers: {
                        'Authorization': window.localStorage.getItem(TOKEN_KEY)
                    }
                };

                return $http(req);
            },
            getRandomWords: function (sizeOfWordSet) {
                var req = {
                    method: 'GET',
                    url: '/api/getRandomWords/' + sizeOfWordSet,
                    headers: {
                        'Authorization': window.localStorage.getItem(TOKEN_KEY)
                    }
                };

                return $http(req);
            }
        };
    }]);

}(angular));