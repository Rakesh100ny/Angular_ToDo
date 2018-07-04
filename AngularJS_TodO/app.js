var app = angular.module('keepApp', ['ui.router','ngMaterial','ngMessages','ngStorage']);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider


    .state('login', {
      url: '/login',
      templateUrl: 'template/login.html',
      controller: 'loginCtrl'
    })

    .state('register', {
      url: '/register',
      templateUrl: 'template/register.html',
      controller: 'registerCtrl'
    })

    .state('home', {
      url: '/home',
      templateUrl: 'template/home.html',
      controller: 'homeCtrl'
    });

   /* .state('home.dashboard', {
      url: '/dashboard',
      templateUrl: 'templates/dashboard.html',
      controller: 'dashboardCtrl'
    });*/

  $urlRouterProvider.otherwise('/login');

}]);