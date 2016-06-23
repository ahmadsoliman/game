'use strict';

class DiscretionController {
  constructor($timeout, gameData) {
    var vm = this;
    vm.gameData = gameData;

    vm.ranges = vm.gameData.discretionRanges;

    $timeout(() =>
      angular.forEach(vm.ranges, (r, i) => {
        $('#' + r.name + '-range').range({
            min: 0,
            max: 1000,
            start: r.value,
            step: 10,
            onChange: (val) => { $timeout(() => vm.ranges[i].value = val); }
        });
      })
    );
  }
}

angular.module('gameApp')
  .controller('DiscretionController', DiscretionController);
