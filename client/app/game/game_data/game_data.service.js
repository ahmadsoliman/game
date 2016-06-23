'use strict';

angular.module('gameApp')
  .service('gameData', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var user = {};

    var timeRanges = [
      {name: 'house', text: 'Buy a House', min: 0, max: 10*52, value: 8*52},
      {name: 'travel', text: 'Travel Overseas', min: 0, max: 10*52, value: 5*52},
      {name: 'wedding', text: 'Pay for a Wedding', min: 0, max: 10*52, value: 3*52},
      {name: 'save', text: 'Save for a Rainy Day', min: 0, max: 10*52, value: 0},
      {name: 'buy', text: 'Buy Something Else', min: 0, max: 10*52, value: 0}
    ];

    var budgetDefaults = [
      {value: 40000, increment: 5000},
      {value: 2500, increment: 500},
      {value: 40000, increment: 5000},
      {value: 3000, increment: 1000},
      {value: 5000, increment: 2500}
    ];

    // default values for targets
    var targets = [
      { code: 0, name: 'house', time: 8*52, budget: 40000},
      { code: 1, name: 'travel', time: 5*52, budget: 2500},
      { code: 2, name: 'wedding', time: 3*52, budget: 40000}
    ];

    var suspenseRanges = [
      {name: 'rent', text: 'Rent or Mortgage Repayments', code: 'S1',  min: 50, max: 2000, value: 500, freq: 1},
      {name: 'mobile', text: 'Mobile and Internet', code: 'S2', min: 10, max: 200, value: 50, freq: 1},
      {name: 'utilities', text: 'Utilities', code: 'S3', min: 10, max: 200, value: 50, freq: 1},
      {name: 'health', text: 'Health and Other Insurance', code: 'S4', min: 10, max: 200, value: 50, freq: 1},
      {name: 'commitments', text: 'Other Regular Commitments', code: 'S5', min: 10, max: 200, value: 50, freq: 1}
    ];

    var SSum = 90;

    return {
      user: user,
      timeRanges: timeRanges,
      budgetDefaults: budgetDefaults,
      targets: targets,
      suspenseRanges: suspenseRanges,
      calcSSum: calcSSum,
      getSSum: getSSum,
    };

    function calcSSum() {
      let sum = 0;
      angular.forEach(suspenseRanges, function(r){
        sum += r.value;
      });
      return SSum = sum;
    }

    function getSSum() {
      return SSum;
    }

  });
