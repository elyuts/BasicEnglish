var app = angular.module('basicEnglishApp', ['ngRoute']);

app.config(function($routeProvider){

    $routeProvider
        .when('/dictionary', {
            templateUrl: '../Templates/ng/dictionary.html',
            controller: 'dictionaryController'
        })
        .when('/exercise/:tutorialMode', {
            templateUrl: '../Templates/ng/exercise.html',
            controller: 'exerciseController'
        })
        .when('/exerciseWithLearning', {
            templateUrl: '../Templates/ng/dictionary.html',
            controller: 'exerciseWithLearningController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

const TOKEN_KEY = 'TOKEN_KEY';
const sizeOfWordSet = 12;