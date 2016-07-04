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

    $timeout(() =>
      angular.forEach(vm.ranges, (r, i) => {
        $('#' + r.name + '-range').range({
            min: r.min,
            max: r.max,
            start: r.value,
            step: 13,
            onChange: (val) => { $timeout(() => vm.ranges[i].value = val); }
        });
      })
    );
  }

  countSelected() {
    let count = 0;
    for(let i=0; i<this.ranges.length; i++){
      count += (this.ranges[i].value>0)?1:0;
    }
    return count;
  }

  fulfilled() {
    return this.countSelected() >= 3;
  }

  targetDisabled(i) {
    return (this.ranges[i].value===0) && this.fulfilled();
  }

  submit() {
    for(let i=0, j=0; i<this.ranges.length; i++){
      if(this.ranges[i].value>0) {
        var budget = (this.gameData.targets[j].code === i)? this.gameData.targets[j].budget : this.gameData.budgetDefaults[i].value;
        this.gameData.targets[j++] = {
          code: i,
          name: this.ranges[i].name,
          time: this.ranges[i].value,
          budget: budget
        };
      }
    }
  }
}

angular.module('gameApp')
  .controller('TimeController', TimeController);
