angular.module('Instagram', ['ngRoute', 'ngMessages', 'satellizer'])
  .config(function($routeProvider, $authProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/photo/:id', {
        templateUrl: 'views/detail.html',
        controller: 'DetailCtrl'
      })
      .otherwise('/');

    $authProvider.loginUrl = 'https://ng-instagram.herokuapp.com/auth/login';
    $authProvider.signupUrl = 'https://ng-instagram.herokuapp.com/auth/signup';
    $authProvider.oauth2({
      name: 'instagram',
      url: 'https://ng-instagram.herokuapp.com/auth/instagram',
      redirectUri: 'https://dl.dropboxusercontent.com/u/1078988/ng-instagram/index.html',
      clientId: '3c547d3c682d4e87b31c7bf594029954',
      requiredUrlParams: ['scope'],
      scope: ['likes'],
      scopeDelimiter: '+',
      authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
    });
  })
  .run(function($rootScope, $window, $auth) {
    if ($auth.isAuthenticated()) {
      $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
    }
  });
