'use strict';

/* Controllers */

var bibexControllers = angular.module('bibexControllers', []);

bibexControllers.controller('BaseCtrl', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
        $rootScope.isMenuSelected = function (menu) {
            return menu === $scope.menuSelected;
        };
    }
]);

bibexControllers.controller('BookListCtrl', ['$scope', '$log', '$rootScope', '$controller', 'Book',
    function ($scope, $log, $rootScope, $controller, Book) {
        angular.extend(this, $controller('BaseCtrl', {$scope: $scope}));
        $rootScope.title = "Book List";
        $scope.menuSelected = 0;
        $scope.page = 1;
        Book.books($scope.page)
            .success(function (response) {
                $scope.books = response;
            })
            .error(function (error) {
                $log.error(error)
            })
        ;
    }]);

bibexControllers.controller('BookViewCtrl', ['$scope', '$log', '$rootScope', '$controller', '$routeParams', 'Book',
    function ($scope, $log, $rootScope, $controller, $routeParams, Book) {
        angular.extend(this, $controller('BaseCtrl', {$scope: $scope}));
        $scope.menuSelected = 1;
        Book.getBook($routeParams.title)
            .success(function (response) {
                $scope.book = response;
                $rootScope.title = response.title;
            })
            .error(function (error) {
                $log.error(error)
            });
    }
]);