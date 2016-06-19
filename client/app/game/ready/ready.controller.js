'use strict';

class ReadyController {
  constructor(gameData) {
    var vm = this;
    vm.gameData = gameData;
    
  }
}

angular.module('gameApp')
  .controller('ReadyController', ReadyController);
