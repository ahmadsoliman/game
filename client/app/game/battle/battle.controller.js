'use strict';

class BattleController {
  constructor($timeout, gameData) {
    var vm = this;
    vm.gameData = gameData;


  }
}

angular.module('gameApp')
  .controller('BattleController', BattleController);
