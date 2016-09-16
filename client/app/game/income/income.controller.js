'use strict';

class IncomeController {
  constructor($timeout, gameData) {
    var vm = this;
    vm.gameData = gameData;
    vm.$timeout = $timeout;

    vm.gameData.centralFlags.reserve = true;

    vm.earning = {value: vm.gameData.armoryRanges[2].value, freq: 1};
    vm.ranges = vm.gameData.incomeRanges;
    vm.otherEarnings = vm.gameData.otherEarnings;

    $timeout(() => {
      $('#earning-freq').dropdown({
        action: 'activate',
        onChange: function(value) { //, text, $selectedItem
          $timeout(() => vm.earning.freq = value);
        }
      });
      $('#earning-freq').dropdown('set selected', '' + vm.earning.freq);

      angular.forEach(vm.otherEarnings, (r, i) => {
        vm.initDropdown(r, i);

        vm.initRanges(r, i);
        $('#earnings-' + i + '-freq').dropdown('set selected', '' + vm.otherEarnings[i].freq);
      })
    });
    $timeout(() => {
      $('#earning-range').range({
          min: vm.gameData.armoryRanges[2].min,
          max: vm.gameData.armoryRanges[2].max,
          start: vm.gameData.armoryRanges[2].value,
          step: vm.gameData.armoryRanges[2].step,
          onChange: (val) => { $timeout(() => vm.earning.value = val); }
      });
    });
  }

  addEarning() {
    var ind = this.otherEarnings.length;
    this.otherEarnings.push({code: -1, value: 500, freq: 1});

    this.$timeout(() => {
      this.initDropdown(this.otherEarnings[ind], ind);
      this.initRanges(this.otherEarnings[ind], ind);
    });
  }

  initDropdown(t, i) {
    var vm = this;
    $('#earning-' + i)
      .dropdown({
        action: 'activate',
        onChange: function(ind, text, $selectedItem) {
          t.code = ind;
        }
      })
    ;

    if(this.otherEarnings[i].code > -1)
      $('#earning-' + i).dropdown('set selected', '' + t.code);
  }

  initRanges(r, i) {
    var vm = this;
    $('#earnings-' + i + '-range').range({
        min: 0,
        max: 1000,
        start: r.value,
        step: 50,
        onChange: (val) => { vm.$timeout(() => vm.otherEarnings[i].value = val); }
    });

    $('#earnings-' + i + '-freq').dropdown({
      action: 'activate',
      onChange: function(value) { //, text, $selectedItem
        vm.$timeout(() => vm.otherEarnings[i].freq = value);
      }
    });
  }

  done() {
    var vm = this;
    vm.gameData.armoryRanges[2].value = vm.earning.value;
    var total = 0;
    vm.otherEarnings.forEach((e) => total += e.value);
    vm.gameData.armoryRanges[2].value += total;
  }
}

angular.module('gameApp')
  .controller('IncomeController', IncomeController);
