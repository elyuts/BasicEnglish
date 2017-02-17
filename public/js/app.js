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
            templateUrl: '../Templates/ng/exerciseWithLearning.html',
            controller: 'exerciseWithLearningController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

const TOKEN_KEY = 'TOKEN_KEY';
const sizeOfWordSet = 12;

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}