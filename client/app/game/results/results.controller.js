'use strict';

class ResultsController {
  constructor($timeout, gameData) {
    var vm = this;
    vm.gameData = gameData;


  }
}

angular.module('gameApp')
  .controller('ResultsController', ResultsController);
