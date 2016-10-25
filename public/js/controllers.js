(function(angular) {
    var controllers = angular.module('basicEnglishControllers', []);

    controllers.controller('basicEnglishController', ['$scope', 'userService', function ($scope, userService) {
        $scope.isAuthorized = false;
        $scope.error = '';

        this.loginFormData = {
            username: '',
            password: '',
            authorizationErrorMessage: '',
            login: function(){
                if(!this.username || !this.password){
                    this.authorizationErrorMessage = "Username or password can't be empty."
                    return;
                }
                userService.login(this.username, this.password)
                    .then(data => {
                        console.log('success: ' + data.data.token);
                        this.username = this.password = '';
                    }).catch(err =>{
                        this.authorizationErrorMessage = err.data.message;
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
            }
        };
    }]);

}(angular));