'use strict';

(function() {

  class MainController {

    constructor(gameData, $state) {
      var vm = this;
      vm.gameData = gameData;

      vm.validData = false;
      $state.go('goals');
    }

    setGender(g) {
      this.validData = true;
      this.gameData.user.gender = g;
    }
  }

  angular.module('gameApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'vm'
    });
})();
