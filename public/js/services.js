app.factory('userService', ['$http', function ($http) {
        return {
            login: function (username, password) {
                return $http.post('/login', { username: username, password: password });
            },
            logout: function () {
                return $http.post('/logout', { token: window.localStorage.getItem(TOKEN_KEY)});
            }
        };
    }])

    .factory('apiService', ['$http', function ($http) {
        return {
            isAuthorized: function () {
                var req = {
                    method: 'GET',
                    url: '/api/isAuthorized',
                    headers: {
                        'Authorization': window.localStorage.getItem(TOKEN_KEY)
                    }
                };

                return $http(req);
            },
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
            },
            makeSound: function (word) {
                var req = {
                    method: 'GET',
                    url: '/api/speech/' + word,
                    headers: {
                        'Authorization': window.localStorage.getItem(TOKEN_KEY)
                    }
                };

                return $http(req);
            }
        };
    }])

    .factory('localDataService', ['apiService', function (apiService) {
        return {
            isAuthorized: null,
            makeSound: function(word, dontCache) {
                var audioElement = document.getElementById('audio_' + word._id);

                if(!dontCache && audioElement.src) {
                    audioElement.play();
                } else {
                    apiService.makeSound(word.engword)
                        .then(response => {

                            audioElement.src = response.data;
                            audioElement.play();
                        });
                }
            },
            checkAuthorization: function() {
                apiService.isAuthorized()
                    .then(response => {
                        this.isAuthorized = true;
                    })
                    .catch(err => {
                        if(err.status === 401)
                            this.isAuthorized = false;
                        console.log(err.data);
                    });
            },
            tutorialWords: null
        }
    }]);
