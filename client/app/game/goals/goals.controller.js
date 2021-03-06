'use strict';

class GoalsController {
  constructor(Auth, $state, $timeout, gameData) {
    // this.user = {};
    // this.errors = {};
    // this.submitted = false;
    //
    // this.Auth = Auth;

    var vm = this;
    vm.$timeout = $timeout;

    vm.gameData = gameData;

    vm.ranges = vm.gameData.timeRanges;
    vm.budgetDefaults = vm.gameData.budgetDefaults;
    vm.targets = vm.gameData.targets;

    vm.initRanges = function(t, i) {
      let r = vm.ranges[t.code];

      $('#trange-' + i).range({
          min: 26,
          max: 260,
          start: t.time,
          step: 26,
          onChange: (val) => { $timeout(() => t.time = val); }
      });

      $('#brange-' + i).range({
          min: vm.budgetDefaults[t.code].min,
          max: vm.budgetDefaults[t.code].max,
          start: t.budget,
          step: vm.budgetDefaults[t.code].step,
          onChange: (val) => { $timeout(() => t.budget = val); }
      });
    }

    vm.initDropdown = function(t, i) {
      $('#target-' + i)
        .dropdown({
          action: 'activate',
          onChange: function(ind, text, $selectedItem) { //
            if(ind === t.code) return;

            t.code = ind;
            t.name = vm.ranges[ind].name;
            t.time = vm.ranges[ind].value;
            t.budget = vm.budgetDefaults[ind].value;
            vm.initRanges(t, i);
          }
        })
      ;

      $('#target-' + i).dropdown('set selected', '' + t.code);
    }

    $timeout(() => {
      angular.forEach(vm.targets, (t, i) => {
        vm.initRanges(t, i);
        vm.initDropdown(t, i);
      });
      $('#loan-range').range({
          min: 0,
          max: 40000,
          start: vm.gameData.bossValues.BPV,
          step: 500,
          onChange: (val) => { $timeout(() => vm.gameData.bossValues.BPV = val); }
      });
      $('#interest-range').range({
          min: 5,
          max: 25,
          start: vm.gameData.bossValues.BRATE,
          step: 1,
          onChange: (val) => { $timeout(() => vm.gameData.bossValues.BRATE = val); }
      });
      $('#savings-range').range({
          min: vm.gameData.armoryRanges[0].min,
          max: vm.gameData.armoryRanges[0].max,
          start: vm.gameData.armoryRanges[0].value,
          step: vm.gameData.armoryRanges[0].step,
          onChange: (val) => { $timeout(() => vm.gameData.armoryRanges[0].value = val); }
      });
      $('#savings-interest-range').range({
          min: vm.gameData.armoryRanges[4].min,
          max: vm.gameData.armoryRanges[4].max,
          start: vm.gameData.armoryRanges[4].value,
          step: vm.gameData.armoryRanges[4].step,
          onChange: (val) => { $timeout(() => vm.gameData.armoryRanges[4].value = val); }
      });
    });
  }

  fulfilled() {
    return this.targets.length >= 3;
  }

  addGoal() {
    // if(this.fulfilled()) return;
    this.targets.push({ code: 0, name: 'house', time: 8*52, budget: 40000});
    this.$timeout(() => {
      let i = this.targets.length-1;
      this.initRanges(this.targets[i], i);
      this.initDropdown(this.targets[i], i);
    });
  }

  deleteGoal(ind) {
    this.targets.splice(ind, 1);
  }

  getSum() {
    var sum = 0;
    this.targets.forEach(function(t){
      sum += t.budget;
    });
    return sum;
  }

}

angular.module('gameApp')
  .controller('GoalsController', GoalsController);
