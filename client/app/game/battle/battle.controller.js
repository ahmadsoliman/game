'use strict';

class BattleController {
  constructor($timeout, gameData) {
    var vm = this;
    vm.gameData = gameData;

    vm.gameResults = vm.gameData.testAllTargets();

    vm.results = [
      { name: 'discretion', text: 'Discretion', value: vm.gameData.getDSum() },
      { name: 'suspense', text: 'Suspense', value: vm.gameData.getSSum() },
      { name: 'reserve', text: 'Reserve', value: vm.gameData.getR() }
    ];
  }
}

angular.module('gameApp')
  .controller('BattleController', BattleController);
