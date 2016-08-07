'use strict';

class LoanController {
  constructor($timeout, gameData) {
    var vm = this;
    vm.gameData = gameData;

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

    });

  }
}

angular.module('gameApp')
  .controller('LoanController', LoanController);
