(function(angular) {
    var directives = angular.module('basicEnglishDirectives', []);

    directives.directive('loginForm', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '../Templates/ng/loginForm.html',
            scope: {
                model: '='
            }
        };
    });

    directives.directive('mainPage', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '../Templates/ng/mainPage.html',
            scope: {
                model: '='
            }
        };
    });

    directives.directive('menu', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '../Templates/ng/menu.html',
            scope: {
                model: '='
            }
        };
    });

    directives.directive('dictionary', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '../Templates/ng/dictionary.html',
            scope: {
                model: '='
            }
        };
    });

    directives.directive('exercise', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '../Templates/ng/exercise.html',
            scope: {
                model: '='
            }
        };
    });

    directives.directive('exerciseWithLearning', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '../Templates/ng/exerciseWithLearning.html',
            scope: {
                model: '=',
                startExercise: '='
            }
        };
    });

}(angular));
