'use strict';

class BattleController {
  constructor($timeout, gameData) {
    var vm = this;
    vm.gameData = gameData;

    vm.gameResults = vm.gameData.testAllTargets();

    vm.results = [
      { name: 'discretion', text: 'Discretion', value: vm.gameResults.DSum },
      { name: 'suspense', text: 'Suspense', value: vm.gameResults.SSum },
      { name: 'finalcr', text: 'Final CR', value: vm.gameResults.finalCR },
      { name: 'reserve', text: 'Reserve', value: vm.gameResults.R }
    ];
  }
}

angular.module('gameApp')
  .controller('BattleController', BattleController);
