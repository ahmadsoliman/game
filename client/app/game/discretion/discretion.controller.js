'use strict';

class DiscretionController {
  constructor($timeout, gameData) {
    var vm = this;
    vm.gameData = gameData;

    vm.gameData.centralFlags.discretion = true;

    vm.ranges = vm.gameData.discretionRanges;

    $timeout(() =>
      angular.forEach(vm.ranges, (r, i) => {
        $('#' + r.name + '-range').range({
            min: r.min,
            max: r.max,
            start: r.value,
            step: r.step,
            onChange: (val) => { $timeout(() => vm.ranges[i].value = val); }
        });
      })
    );
  }

  getSum(){
    var sum = 0;
    this.ranges.forEach(function(t){
      sum += t.value;
    });
    return sum;
  }
}

angular.module('gameApp')
  .controller('DiscretionController', DiscretionController);
