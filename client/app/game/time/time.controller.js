'use strict';

class TimeController {
  constructor(Auth, $state, $timeout) {
    // this.user = {};
    // this.errors = {};
    // this.submitted = false;
    //
    // this.Auth = Auth;
    // this.$state = $state;
    var vm = this;
    vm.ranges = [{'name': 'house', 'min': 0, 'max': 10, 'start': 8, 'value': 8}];

    angular.forEach(vm.ranges, (r, i) => {
      $('#' + r.name + '-range').range({
          min: r.min,
          max: r.max,
          start: r.start,
          onChange: (val) => { $timeout(() => vm.ranges[i].value = val); }
      });
    });
  }

  time(form) {
    // this.submitted = true;
    //
    // if (form.$valid) {
    //   this.Auth.login({
    //       email: this.user.email,
    //       password: this.user.password
    //     })
    //     .then(() => {
    //       // Logged in, redirect to home
    //       this.$state.go('main');
    //     })
    //     .catch(err => {
    //       this.errors.other = err.message;
    //     });
    // }
  }
}

angular.module('gameApp')
  .controller('TimeController', TimeController);
