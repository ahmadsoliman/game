'use strict';

class SuspenseController {
  constructor($timeout, gameData) {
    var vm = this;
    vm.gameData = gameData;

    vm.ranges = vm.gameData.suspenseRanges;

    $timeout(() =>
      angular.forEach(vm.ranges, (r, i) => {
        $('#' + r.name + '-range').range({
            min: r.min,
            max: r.max,
            start: r.value,
            step: 10,
            onChange: (val) => { $timeout(() => vm.ranges[i].value = val); }
        });

        $('#' + r.name + '-freq').dropdown({
          action: 'activate',
          onChange: function(value) { //, text, $selectedItem
            $timeout(() => vm.ranges[i].freq = value);
          }
        });
      })
    );
  }
}

angular.module('gameApp')
  .controller('SuspenseController', SuspenseController);
