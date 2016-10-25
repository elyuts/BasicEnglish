(function(angular) {
    var controllers = angular.module('basicEnglishControllers', []);

    controllers.controller('basicEnglishController', ['$scope', function ($scope) {
        $scope.isAuthorized = false;
        $scope.error = '';

        this.loginFormData = {
            authorizationErrorMessage: '',
            login: function(username, password){
                $scope.isAuthorized = true;
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