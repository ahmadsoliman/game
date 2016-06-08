'use strict';

angular.module('gameApp.auth', ['gameApp.constants', 'gameApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
