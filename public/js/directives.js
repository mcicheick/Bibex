/**
 * Created by sissoko on 13/05/2016.
 */
'use strict'

var bibexDirectives = angular.module("bibexDirectives", [])

bibexDirectives.directive('sidebar', function () {
    return {
        restrict: 'E',
        templateUrl: '/views/sidebar.html'
    };
});

bibexDirectives.directive('searchBox', function () {
    return {
        restrict: 'E',
        templateUrl: '/views/search-box.html',
        //controller: 'BookListCtrl'
    }
});

bibexDirectives.directive('bookItems', function () {
    return {
        restrict: 'E',
        templateUrl: '/views/book-items.html',
        //controller: 'BookListCtrl'
    }
});