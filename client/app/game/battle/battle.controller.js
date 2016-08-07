'use strict';

class BattleController {
  constructor($timeout, gameData) {
    var vm = this;
    vm.gameData = gameData;

    vm.gameData.calcAll();
    vm.gameResults = vm.gameData.testAllTargets();

    vm.results = [
      { name: 'discretion', text: 'Discretion', value: vm.gameResults.DSum },
      { name: 'suspense', text: 'Suspense', value: vm.gameResults.SSum },
      { name: 'reserve', text: 'Reserve', value: vm.gameResults.R }
    ];

    $timeout(() => {
      $('#savings-range').range({
          min: vm.gameData.armoryRanges[0].min,
          max: vm.gameData.armoryRanges[0].max,
          start: vm.gameData.armoryRanges[0].value,
          step: vm.gameData.armoryRanges[0].step,
          onChange: (val) => { $timeout(() => vm.gameData.armoryRanges[0].value = val); }
      });
    });
  }
}

angular.module('gameApp')
  .controller('BattleController', BattleController);
