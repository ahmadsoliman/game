'use strict';

class CentralController {
  constructor(Auth, $state, $timeout, gameData) {
    var vm = this;
    vm.$timeout = $timeout;

    vm.gameData = gameData;


  }

}

angular.module('gameApp')
  .controller('CentralController', CentralController);
