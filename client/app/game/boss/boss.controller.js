'use strict';

class BossController {
  constructor($timeout, gameData) {
    var vm = this;
    vm.gameData = gameData;

    
  }
}

angular.module('gameApp')
  .controller('BossController', BossController);
