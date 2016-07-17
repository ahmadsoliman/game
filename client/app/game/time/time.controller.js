'use strict';

class TimeController {
  constructor(Auth, $state, $timeout, gameData) {
    // this.user = {};
    // this.errors = {};
    // this.submitted = false;
    //
    // this.Auth = Auth;
    // this.$state = $state;
    var vm = this;
    vm.gameData = gameData;

    vm.ranges = vm.gameData.timeRanges;

    vm.budgetDefaults = gameData.budgetDefaults;

    vm.targets = gameData.targets;

    $timeout(() => {
      angular.forEach(vm.targets, (t, i) => {
        let r = vm.ranges[t.code];

        $('#' + t.name + '-trange').range({
            min: r.min,
            max: r.max,
            start: r.value,
            step: 13,
            onChange: (val) => { $timeout(() => t.time = val); }
        });

        $('#' + t.name + '-brange').range({
            min: 0,
            max: vm.budgetDefaults[t.code].value * 4, // TODO ask abt this 4
            start: vm.budgetDefaults[t.code].value,
            step: vm.budgetDefaults[t.code].increment / 2, // TODO this 2 also
            onChange: (val) => { $timeout(() => t.budget = val); }
        });

        $('#target-' + i)
          .dropdown({
            action: 'activate',
            onChange: function(ind) { // , text, $selectedItem
              // t.code = ind;
              // t.name = vm.ranges[ind].name;
              // t.time = vm.ranges[ind].value;
              // t.budget = vm.budgetDefaults[ind].name;
            }
          })
        ;

        $('#target-' + i).dropdown('set selected', '' + i);
      });

    });

  }

  // countSelected() {
  //   let count = 0;
  //   for(let i=0; i<this.ranges.length; i++){
  //     count += (this.ranges[i].value>0)?1:0;
  //   }
  //   return count;
  // }

  fulfilled() {
    return this.targets.length >= 3;
  }

  // targetDisabled(i) {
  //   return (this.ranges[i].value===0) && this.fulfilled();
  // }

  addGoal() {
    if(this.fulfilled()) return;
    this.targets.push({ code: 0, name: 'house', time: 8*52, budget: 40000});
  }

  submit() {
    // for(let i=0, j=0; i<this.ranges.length; i++){
    //   if(this.ranges[i].value>0) {
    //     var budget = (this.gameData.targets[j].code === i)? this.gameData.targets[j].budget : this.gameData.budgetDefaults[i].value;
    //     this.gameData.targets[j++] = {
    //       code: i,
    //       name: this.ranges[i].name,
    //       time: this.ranges[i].value,
    //       budget: budget
    //     };
    //   }
    // }
  }
}

angular.module('gameApp')
  .controller('TimeController', TimeController);
