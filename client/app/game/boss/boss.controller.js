'use strict';

class BossController {
  constructor($timeout, gameData) {
    var vm = this;
    vm.gameData = gameData;

    vm.ranges = vm.gameData.armoryRanges;

    $timeout(() => {
      $('#loan-range').range({
          min: 0,
          max: 40000,
          start: vm.gameData.bossValues.BPV,
          step: 100,
          onChange: (val) => { $timeout(() => vm.gameData.bossValues.BPV = val); }
      });
      $('#interest-range').range({
          min: 5,
          max: 25,
          start: vm.gameData.bossValues.BRATE,
          step: 1,
          onChange: (val) => { $timeout(() => vm.gameData.bossValues.BRATE = val); }
      });

      angular.forEach(vm.ranges, (r, i) => {
        $('#' + r.name + '-range').range({
            min: r.min,
            max: r.max,
            start: r.value,
            step: 50,
            onChange: (val) => { $timeout(() => vm.ranges[i].value = val); }
        });
      });
    });

  }
}

angular.module('gameApp')
  .controller('BossController', BossController);
