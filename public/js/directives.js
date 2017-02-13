app.directive('loginForm', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '../Templates/ng/loginForm.html',
            scope: {
                model: '='
            }
        };
    })

    .directive('menu', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '../Templates/ng/menu.html',
            //scope: { model: '=' } By commenting this line we say this element to inherit scope of parent element
        };
    })

    .directive('dictionary', function () {
        return {
            restrict: 'E',
            templateUrl: '../Templates/ng/dictionary.html',
            controller: 'dictionaryController',
            scope: {}
        };
    })

    .directive('exercise', function () {
        return {
            restrict: 'E',
            templateUrl: '../Templates/ng/exercise.html',
            controller: 'exerciseController',
            scope: {}
        };
    })

    .directive('exerciseWithLearning', function () {
        return {
            restrict: 'E',
            templateUrl: '../Templates/ng/exerciseWithLearning.html',
            controller: 'exerciseWithLearningController',
            scope: {}
        };
    });

