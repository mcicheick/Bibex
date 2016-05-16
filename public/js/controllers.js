'use strict';

/* Controllers */

var BOOK_PAGE_LIMIT = 10;

var bibexControllers = angular.module('bibexControllers', []);

bibexControllers.controller('BaseCtrl', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
        $rootScope.isMenuSelected = function (menu) {
            return menu === $rootScope.menuSelected;
        };
    }
]);

bibexControllers.controller('BookListCtrl', ['$scope', '$log', '$rootScope', '$controller', 'Book', 'Search',
    function ($scope, $log, $rootScope, $controller, Book, Search) {
        angular.extend(this, $controller('BaseCtrl', {$scope: $scope}));
        $rootScope.title = "Book List";
        $rootScope.menuSelected = 0;
        var pageInfo = {page: 1, pageSize: BOOK_PAGE_LIMIT};
        var booksListCount = 0;
        $scope.books = []

        $scope.req = {};
        $scope.doSearch = function () {
            console.log($scope.req)
            Search.doSearch($scope.req)
                .success(function (response) {
                    booksListCount = -1;
                    $scope.books = response;
                })
                .error(function (error) {
                    $log.info(error);
                });
        }

        $scope.hasMore = function () {
            return booksListCount === BOOK_PAGE_LIMIT;
        }

        $scope.nextPage = function () {
            pageInfo.page = pageInfo.page + 1;
            getMore(pageInfo);
        }

        var getMore = function (pageInfo) {
            Book.books(pageInfo)
                .success(function (response) {
                    booksListCount = response.length;
                    for (var i = 0; i < booksListCount; i++) {
                        $scope.books.push(response[i]);
                    }
                })
                .error(function (error) {
                    $log.error(error)
                });
        }

        getMore(pageInfo);
    }]);

bibexControllers.controller('BookViewCtrl', ['$scope', '$log', '$rootScope', '$controller', '$routeParams', 'Book',
    function ($scope, $log, $rootScope, $controller, $routeParams, Book) {
        angular.extend(this, $controller('BaseCtrl', {$scope: $scope}));
        $rootScope.menuSelected = 0;
        Book.getBook($routeParams.id)
            .success(function (response) {
                $scope.book = response;
                $rootScope.title = response.title;
            })
            .error(function (error) {
                $log.error(error)
            });
    }
]);

bibexControllers.controller('BookNewCtrl', ['$scope', '$log', '$rootScope', '$location', 'Book',
    function ($scope, $log, $rootScope, $location, Book) {

        $rootScope.title = "New book";
        $rootScope.menuSelected = 1;
        $scope.book = {}
        $scope.error = "";
        $scope.postBook = function (book) {
            Book.postBook(book)
                .success(function (response) {
                    $location.path(Routes.GET_BOOK_WITH_ID.replace(":id", response._id));
                })
                .error(function (error) {
                    $scope.error = error;
                });
        }

    }
]);

bibexControllers.controller('UserSignUpCtrl', ['$scope', '$log', '$rootScope', '$location', 'User',
    function ($scope, $log, $rootScope, $location, User) {
        $rootScope.title = "Sign Up Bibnex";
        $rootScope.menuSelected = 2;
        $scope.user = {
            first_name: 'Mina Celeste',
            last_name: 'Gautier',
            email: 'celeste.gautier@gmail.com',
            password: 'password'
        };
        $scope.postUser = function (user) {
            User.postUser(user)
                .success(function (response) {
                    console.log(response)
                    $location.path(Routes.GET_USER_WITH_ID.replace(":id", response._id));
                })
                .error(function (error) {
                    $scope.errors = error;
                });
        }
    }
]);

bibexControllers.controller('UserLoginCtrl', ['$scope', '$log', '$rootScope', '$location', 'User',
    function ($scope, $log, $rootScope, $location, User) {
        $rootScope.title = "Login Bibnex";
        $rootScope.menuSelected = 2;
        $scope.loginForm = {};
        $scope.login = function (loginForm) {
            User.login(loginForm)
                .success(function (response) {
                    console.log(response)
                    $location.path(Routes.GET_BOOKS);
                })
                .error(function (error) {
                    $scope.errors = error;
                });
        }
    }
]);