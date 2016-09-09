'use strict';

class IncomeController {
  constructor($timeout, gameData) {
    var vm = this;
    vm.gameData = gameData;

    $timeout(() => {
      $('#earning-range').range({
          min: vm.gameData.armoryRanges[2].min,
          max: vm.gameData.armoryRanges[2].max,
          start: vm.gameData.armoryRanges[2].value,
          step: vm.gameData.armoryRanges[2].step,
          onChange: (val) => { $timeout(() => vm.gameData.armoryRanges[2].value = val); }
      });
      // $('#assets-range').range({
      //     min: vm.gameData.armoryRanges[1].min,
      //     max: vm.gameData.armoryRanges[1].max,
      //     start: vm.gameData.armoryRanges[1].value,
      //     step: vm.gameData.armoryRanges[1].step,
      //     onChange: (val) => { $timeout(() => vm.gameData.armoryRanges[1].value = val); }
      // });
      $('#other-range').range({
          min: vm.gameData.armoryRanges[3].min,
          max: vm.gameData.armoryRanges[3].max,
          start: vm.gameData.armoryRanges[3].value,
          step: vm.gameData.armoryRanges[3].step,
          onChange: (val) => { $timeout(() => vm.gameData.armoryRanges[3].value = val); }
      });
    });
  }
}

angular.module('gameApp')
  .controller('IncomeController', IncomeController);
