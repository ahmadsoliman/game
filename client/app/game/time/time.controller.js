'use strict';

class TimeController {
  constructor(Auth, $state) {
    // this.user = {};
    // this.errors = {};
    // this.submitted = false;
    //
    // this.Auth = Auth;
    // this.$state = $state;
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
