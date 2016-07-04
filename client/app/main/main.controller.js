'use strict';

(function() {

  class MainController {

    constructor(gameData) {
      this.vm = this;
      vm.gameData = gameData;

      vm.validData = false;

    }

    setGender(g) {
      vm.validData = true;
      vm.gameData.user.gender = g;
    }
  }

  angular.module('gameApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'vm'
    });
})();
