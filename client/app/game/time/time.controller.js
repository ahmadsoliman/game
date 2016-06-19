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

    vm.ranges = [
      {name: 'house', min: 0, max: 10*52, start: 8*52},
      {name: 'travel', min: 0, max: 10*52, start: 5*52},
      {name: 'wedding', min: 0, max: 10*52, start: 3*52},
      {name: 'save', min: 0, max: 10*52, start: 0},
      {name: 'buy', min: 0, max: 10*52, start: 0}
    ];

    angular.forEach(vm.ranges, (r, i) => {
      $('#' + r.name + '-range').range({
          min: r.min,
          max: r.max,
          start: r.start,
          step: 13,
          onChange: (val) => { $timeout(() => vm.ranges[i].value = val); }
      });
    });
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
        this.gameData.targets[j++] = {
          code: i,
          name: this.ranges[i].name,
          time: this.ranges[i].value
        };
      }
    }
  }
}

angular.module('gameApp')
  .controller('TimeController', TimeController);
