(function (angular) {

    angular.module('angular.jquery', []).config(['$provide', function ($provide) {
        'use strict';
        angular.module('angular.jquery').provide = $provide;
    }]);

    var app = angular.module('basicEnglishApp', [
        'basicEnglishControllers',
        'basicEnglishServices',
        'basicEnglishDirectives'
    ]);

}(angular));