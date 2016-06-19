'use strict';

class ReadyController {
  constructor(gameData) {
    var vm = this;
    vm.gameData = gameData;

    vm.labels = [];
    vm.series = [''];
    vm.data = [[]];

    vm.sortedTargets = angular.copy(vm.gameData.targets);

    function compareTargets(a,b) {
      if (a.time < b.time)
        return -1;
      if (a.time > b.time)
        return 1;
      return 0;
    }

    vm.sortedTargets.sort(compareTargets);

    for(let i=0; i<vm.sortedTargets.length; i++){
      vm.labels[i] = (vm.sortedTargets[i].time / 52) + ' years ' + vm.sortedTargets[i].name;
      vm.data[0][i] = vm.sortedTargets[i].budget;
    }
  }

}

angular.module('gameApp')
  .config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colours: [],
      responsive: true,
      label: 'Targets'
    });
  }])
  .controller('ReadyController', ReadyController);
