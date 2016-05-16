'use strict';

/* App Module */

var bibexApp = angular.module('bibexApp', [
    'ngRoute',
    'bibexControllers',
    'bibexServices',
    'bibexDirectives'
]);

bibexApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: Routes.GET_BOOKS
            })
            .when(Routes.GET_BOOKS, {
                templateUrl: '/views/book-list.html',
                controller: 'BookListCtrl'
            })
            .when(Routes.GET_BOOK_NEW, {
                templateUrl: '/views/book-new.html',
                controller: 'BookNewCtrl'
            })
            .when(Routes.GET_BOOK_WITH_ID, {
                templateUrl: '/views/book-view.html',
                controller: 'BookViewCtrl'
            })
            .when(Routes.GET_USER_NEW, {
                templateUrl: '/views/signup.html',
                controller: 'UserSignUpCtrl'
            })
            .when(Routes.GET_LOGIN, {
                templateUrl: '/views/login.html',
                controller: 'UserLoginCtrl'
            })
            .otherwise({
                templateUrl: '/views/notfound.html'
            });
    }]);
