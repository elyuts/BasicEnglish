(function(angular) {
    const TOKEN_KEY = 'TOKEN_KEY';
    var controllers = angular.module('basicEnglishControllers', []);

    controllers.controller('basicEnglishController', ['$scope', 'userService', 'apiService', function ($scope, userService, apiService) {
        $scope.isAuthorized = false;
        $scope.error = '';

        this.loginFormData = {
            username: '',
            password: '',
            errorMessage: '',
            login: function(){
                if(!this.username || !this.password){
                    this.errorMessage = "Username or password can't be empty."
                    return;
                }
                userService.login(this.username, this.password)
                    .then(response => {
                        window.localStorage.setItem(TOKEN_KEY, response.data.token);
                        $scope.isAuthorized = true;
                        this.errorMessage = '';
                        this.username = this.password = '';
                    }).catch(err =>{
                        this.errorMessage = err.data.message;
                    });
            }
        };

        var modes = {
            dictionary: 'dictionary',
            exercise: 'exercise',
            exerciseWithLearning: 'exerciseWithLearning',
            menu: 'menu'
        };

        var mode = modes.menu;

        this.mainPageData = {
            setMenuMode: function(){
                mode = modes.menu;
            },
            setDictionaryMode: function(){
                mode = modes.dictionary;
                this.completeFullDictionary();
            },
            setExerciseMode: function(){
                mode = modes.exercise;
            },
            setExerciseWithLearningMode: function(){
                mode = modes.exerciseWithLearning;
            },
            isMenuMode: function(){
                return mode === modes.menu;
            },
            isDictionaryMode: function(){
                return mode === modes.dictionary;
            },
            isExerciseMode: function(){
                return mode === modes.exercise;
            },
            isExerciseWithLearningMode: function(){
                return mode === modes.exerciseWithLearning;
            },
            fullDictionary: '',
            completeFullDictionary: () => {
                apiService.getFullDictionary()
                    .then(response => {
                        this.fullDictionary = response;
                    })
                    .catch(err => {
                        $scope.error = err.data.message;
                    });
            }
        };
    }]);

}(angular));