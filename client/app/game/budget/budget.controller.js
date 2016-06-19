'use strict';

class BudgetController {
  constructor(gameData) {
    var vm = this;
    vm.gameData = gameData;
    vm.targets = gameData.targets;

    vm.defaults = [
      {value: 40000, increment: 5000},
      {value: 2500, increment: 500},
      {value: 40000, increment: 5000},
      {value: 3000, increment: 1000},
      {value: 5000, increment: 2500}
    ];

    for(let i=0; i<vm.targets.length; i++) {
      vm.targets[i].budget = vm.defaults[vm.targets[i].code].value;
    }
  }

  increment(ind) {
    this.targets[ind].budget += this.defaults[this.targets[ind].code].increment;
  }

  decrement(ind) {
    if(this.targets[ind].budget <= this.defaults[this.targets[ind].code].increment)
      return;
    this.targets[ind].budget -= this.defaults[this.targets[ind].code].increment;
  }
}

angular.module('gameApp')
  .controller('BudgetController', BudgetController);
