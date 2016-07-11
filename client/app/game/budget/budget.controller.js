'use strict';

class BudgetController {
  constructor(gameData) {
    var vm = this;
    vm.gameData = gameData;
    vm.targets = gameData.targets;

    vm.defaults = gameData.budgetDefaults;

    // for(let i=0; i<vm.targets.length; i++) {
    //   vm.targets[i].budget = vm.defaults[vm.targets[i].code].value;
    // }
  }

  getSum() {
    var sum = 0;
    this.targets.forEach(function(t){
      sum += t.budget;
    });
    return sum;
  }

  increment(ind) {
    this.targets[ind].budget += this.defaults[this.targets[ind].code].increment;
  }

  decrement(ind) {
    if(this.targets[ind].budget <= this.defaults[this.targets[ind].code].increment) {
      return;
    }
    this.targets[ind].budget -= this.defaults[this.targets[ind].code].increment;
  }
}

angular.module('gameApp')
  .controller('BudgetController', BudgetController);
