'use strict';

angular.module('gameApp')
  .service('gameData', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var user = {};
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

    return {
      user: user,
      targets: targets,
      suspenseRanges: suspenseRanges
    };


  });
