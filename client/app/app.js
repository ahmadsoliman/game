'use strict';

angular.module('gameApp', ['gameApp.auth', 'gameApp.admin', 'gameApp.constants',
    'ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
