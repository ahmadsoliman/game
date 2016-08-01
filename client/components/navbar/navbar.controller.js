'use strict';

(function() {

  class NavbarController {
    constructor(Auth, $state, gameData) {
      var vm = this;

      // TODO Remove from production
      window.reset = vm.restart;

      vm.isLoggedIn = Auth.isLoggedIn;
      vm.isAdmin = Auth.isAdmin;
      vm.getCurrentUser = Auth.getCurrentUser;

      vm.gameData = gameData;

      vm.$state = $state;
      vm.states = ['main','goals','ready','suspense','discretion','boss','battle','results'];
    }

    restart() {
      this.gameData.reset();
    }

    curState() {
      var ind = this.states.indexOf(this.$state.current.name);
      if(ind === -1) {
        ind = 0;
      }
      return ind;
    }

    navBack() {
      var ind = this.curState();
      if(ind <= 0) {
        return;
      }
      this.$state.go(this.states[ind-1]);
    }

    navForward() {
      var ind = this.curState();
      if(ind >= this.states.length-1) {
        return;
      }
      this.$state.go(this.states[ind+1]);
    }
  }

  angular.module('gameApp')
    .controller('NavbarController', NavbarController);
})();
