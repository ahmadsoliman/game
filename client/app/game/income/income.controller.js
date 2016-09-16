'use strict';

class IncomeController {
  constructor($timeout, gameData) {
    var vm = this;
    vm.gameData = gameData;

    vm.gameData.centralFlags.reserve = true;

    vm.ranges = [
      {name: 'job', text: 'Other job', min: 0, max: 1000, value: 500, step: 50, freq: 1},
      {name: 'tax', text: 'Tax refund', min: 0, max: 1000, value: 500, step: 50, freq: 1},
      {name: 'gifts', text: 'Gifts from family', min: 0, max: 1000, value: 500, step: 50, freq: 1},
      {name: 'freelance', text: 'Freelance income', min: 0, max: 1000, value: 500, step: 50, freq: 1},
      {name: 'investments', text: 'Income from investments', min: 0, max: 1000, value: 500, step: 50, freq: 1},
      {name: 'other', text: 'Other', min: 0, max: 1000, value: 500, step: 50, freq: 1},
    ];

    vm.otherEarnings = [];

    $timeout(() =>
      angular.forEach(vm.ranges, (r, i) => {
        $('#' + r.name + '-range').range({
            min: r.min,
            max: r.max,
            start: r.value,
            step: r.step,
            onChange: (val) => { $timeout(() => vm.ranges[i].value = val); }
        });

        $('#' + r.name + '-freq').dropdown({
          action: 'activate',
          onChange: function(value) { //, text, $selectedItem
            $timeout(() => vm.ranges[i].freq = value);
          }
        });
        $('#' + r.name + '-freq').dropdown('set selected', '' + vm.ranges[i].freq);
      })
    );
    $timeout(() => {
      $('#earning-range').range({
          min: vm.gameData.armoryRanges[2].min,
          max: vm.gameData.armoryRanges[2].max,
          start: vm.gameData.armoryRanges[2].value,
          step: vm.gameData.armoryRanges[2].step,
          onChange: (val) => { $timeout(() => vm.gameData.armoryRanges[2].value = val); }
      });
      // $('#other-range').range({
      //     min: vm.gameData.armoryRanges[3].min,
      //     max: vm.gameData.armoryRanges[3].max,
      //     start: vm.gameData.armoryRanges[3].value,
      //     step: vm.gameData.armoryRanges[3].step,
      //     onChange: (val) => { $timeout(() => vm.gameData.armoryRanges[3].value = val); }
      // });
    });
  }

  addEarning() {
    this.otherEarnings.push({code: 0, value: 500, freq: 1});
  }
}

angular.module('gameApp')
  .controller('IncomeController', IncomeController);
