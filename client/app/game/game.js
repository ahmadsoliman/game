'use strict';

angular.module('gameApp')
  .config(function($stateProvider) {
    $stateProvider.state('time', {
        url: '/time',
        templateUrl: 'app/game/time/time.html',
        controller: 'TimeController',
        controllerAs: 'vm'
      })
      .state('budget', {
        url: '/budget',
        templateUrl: 'app/game/budget/budget.html',
        controller: 'BudgetController',
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
      .state('boss', {
        url: '/boss',
        templateUrl: 'app/game/boss/boss.html',
        controller: 'BossController',
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
      // .state('logout', {
      //   url: '/logout?referrer',
      //   referrer: 'main',
      //   template: '',
      //   controller: function($state, Auth) {
      //     var referrer = $state.params.referrer || $state.current.referrer || 'main';
      //     Auth.logout();
      //     $state.go(referrer);
      //   }
      // })
      // .state('signup', {
      //   url: '/signup',
      //   templateUrl: 'app/account/signup/signup.html',
      //   controller: 'SignupController',
      //   controllerAs: 'vm'
      // })
      // .state('settings', {
      //   url: '/settings',
      //   templateUrl: 'app/account/settings/settings.html',
      //   controller: 'SettingsController',
      //   controllerAs: 'vm',
      //   authenticate: true
      // });
  });
  // .run(function($rootScope) {
  //   $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
  //     if (next.name === 'logout' && current && current.name && !current.authenticate) {
  //       next.referrer = current.name;
  //     }
  //   });
  // });
