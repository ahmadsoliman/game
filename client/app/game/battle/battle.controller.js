'use strict';

class BattleController {
  constructor($timeout, gameData) {
    var vm = this;
    vm.gameData = gameData;

    vm.gameResults = vm.gameData.testAllTargets();

    vm.results = [
      { name: 'discretion', text: 'Discretion', value: vm.gameResults.DSum },
      { name: 'suspense', text: 'Suspense', value: vm.gameData.SSum },
      { name: 'reserve', text: 'Reserve', value: vm.gameData.R }
    ];
  }
}

angular.module('gameApp')
  .controller('BattleController', BattleController);
