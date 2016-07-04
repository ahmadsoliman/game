'use strict';

class NavbarController {
  //end-non-standard

  //start-non-standard
  constructor(Auth, gameData) {
    var vm = this;

    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAdmin = Auth.isAdmin;
    vm.getCurrentUser = Auth.getCurrentUser;

    vm.gameData = gameData;

  }

  restart() {
    this.gameData.reset();
  }

}

angular.module('gameApp')
  .controller('NavbarController', NavbarController);
