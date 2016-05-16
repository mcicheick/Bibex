'use strict';

/* Services */

var bibexServices = angular.module('bibexServices', []);

bibexServices.factory('Book', ['$http',
    function ($http) {
        return {
            books: function (pageInfo) {
                return $http.get(queryString(Routes.GET_BOOKS, pageInfo))
            },
            getBook: function (id) {
                return $http.get(Routes.GET_BOOK_WITH_ID.replace(":id", id))
            },
            postBook: function (book) {
                console.log(book)
                return $http.post(Routes.POST_BOOK_NEW, book)
            }
        }
    }
]);

var queryString = function (url, queryObject) {
    return url + "?" + serialize(queryObject);
}

var serialize = function (obj, prefix) {
    var str = [];
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
            str.push(typeof v == "object" ?
                serialize(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
}

bibexServices.factory('Search', ['$http',
    function ($http) {
        return {
            doSearch: function (req) {
                return $http.get(queryString(Routes.GET_SEARCH, req))
            }
        }
    }
]);

bibexServices.factory('User', ['$http',
    function ($http) {
        return {
            getUser: function (id) {
                return $http.get(Routes.GET_USER_WITH_ID.replace(":id", id))
            },
            postUser: function (user) {
                console.log(user)
                return $http.post(Routes.POST_USER_NEW, user)
            },
            login: function (loginForm) {
                return $http.post(Routes.POST_LOGIN, loginForm);
            }
        }
    }
]);