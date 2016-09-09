'use strict';

angular.module('gameApp')
  .config(function($stateProvider) {
    $stateProvider.state('main', {
      url: '/main',
      template: '<main></main>'
    });
  });
