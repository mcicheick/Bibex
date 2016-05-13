'use strict';

/* App Module */

var bibexApp = angular.module('bibexApp', [
    'ngRoute',
    'bibexControllers',
    'bibexServices'
]);

bibexApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: Routes.GET_BOOKS
            })
            .when(Routes.GET_BOOKS, {
                templateUrl: 'views/book-list.html',
                controller: 'BookListCtrl'
            })
            .when(Routes.GET_BOOK_NEW, {
                templateUrl: 'views/notfound.html'
            })
            .when(Routes.GET_BOOK_WITH_TITLE, {
                templateUrl: 'views/book-view.html',
                controller: 'BookViewCtrl'
            })
            .otherwise({
                templateUrl: 'views/notfound.html'
            });
    }]);
