'use strict';

angular.module('gameApp')
  .config(function($stateProvider) {
    $stateProvider.state('central', {
        url: '/',
        templateUrl: 'app/game/central/central.html',
        controller: 'CentralController',
        controllerAs: 'vm'
      })
      .state('goals', {
        url: '/goals',
        templateUrl: 'app/game/goals/goals.html',
        controller: 'GoalsController',
        controllerAs: 'vm'
      })
      .state('income', {
        url: '/income',
        templateUrl: 'app/game/income/income.html',
        controller: 'IncomeController',
        controllerAs: 'vm'
      })
      .state('ready', {
        url: '/ready',
        templateUrl: 'app/game/ready/ready.html',
        controller: 'ReadyController',
        controllerAs: 'vm'
      })
      .state('suspense', {
        url: '/suspense',
        templateUrl: 'app/game/suspense/suspense.html',
        controller: 'SuspenseController',
        controllerAs: 'vm'
      })
      .state('discretion', {
        url: '/discretion',
        templateUrl: 'app/game/discretion/discretion.html',
        controller: 'DiscretionController',
        controllerAs: 'vm'
      })
      .state('battle', {
        url: '/battle',
        templateUrl: 'app/game/battle/battle.html',
        controller: 'BattleController',
        controllerAs: 'vm'
      })
      .state('results', {
        url: '/results',
        templateUrl: 'app/game/results/results.html',
        controller: 'ResultsController',
        controllerAs: 'vm'
      });
  })
  .run(function($rootScope, $timeout) {
    $rootScope.$on('$stateChangeSuccess', function() {
       $timeout(() => document.body.scrollTop = document.documentElement.scrollTop = 0, 350);
    });
    // $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
    //   if (next.name === 'logout' && current && current.name && !current.authenticate) {
    //     next.referrer = current.name;
    //   }
    // });
  });

  // });
