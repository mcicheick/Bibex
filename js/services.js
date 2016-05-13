'use strict';

/* Services */

var bibexServices = angular.module('bibexServices', []);

bibexServices.factory('Book', ['$http',
    function ($http) {
        return {
            books: function (page) {
                if (page == undefined) {
                    page = 1;
                }
                return $http.get(Routes.GET_BOOKS, {page: page})
            },
            getBook: function (title) {
                return $http.get(Routes.GET_BOOK_WITH_TITLE.replace(":title", title))
            }
        }
    }
]);