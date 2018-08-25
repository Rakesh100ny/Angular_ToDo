var app = angular.module('keepApp', [ 'ui.router', 'ngMaterial','ngMessages','ngPassword','content-editable','ngImgCrop']);
app.config([ '$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('login', {
                url : '/login',
                templateUrl : 'template/login.html',
                controller : 'userController'
            })

            .state('register', {
                url : '/register',
                templateUrl : 'template/register.html',
                controller : 'userController'
            })


            .state('home.trash', {
                url : '/trash',
                templateUrl : 'template/trash.html',
                controller : 'noteController'
            })

            .state('home.archive', {
                url : '/archive',
                templateUrl : 'template/archive.html',
                controller : 'noteController'
            })

            .state('home.reminders', {
                url : '/reminders',
                templateUrl : 'template/reminders.html',
                controller : 'noteController'
            })

            .state('signupSuccess', {
                url : '/register/success',
                templateUrl : 'template/signupSuccess.html',
                controller : 'userController'
            })

            .state('forgotpassword', {
                url : '/forgotpassword',
                templateUrl : 'template/forgotpassword.html',
                controller : 'userController'
            })

            .state('forgotpasswordSuccess', {
                url : '/forgotpassword/success',
                templateUrl : 'template/forgotPasswordSuccess.html',
                controller : 'userController'
            })
            .state('resetpassword', {
                url : '/resetpassword',
                templateUrl : 'template/resetPassword.html',
                controller : 'userController'
            })
            .state('home', {
                url : '/home',
                templateUrl : 'template/home.html',
                controller : 'noteController'
            })
            .state('home.search', {
                url : '/search',
                templateUrl : 'template/search.html',
                controller : 'noteController'
            })
            .state('home.label', {
                url : '/label/:labelId',
                templateUrl : 'template/displayLabel.html',
                controller : 'noteController'
            })
            .state('home.dashboard', {
                url: '/dashboard',
                templateUrl: 'template/dashboard.html',
                controller: 'noteController'
            });

        $urlRouterProvider.otherwise('/register');

    } ]);
