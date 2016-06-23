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

    var discretionRanges = [
        {name: 'entertainment', text: 'Entertainment', code: 'D1', value: 250},
        {name: 'groceries', text: 'Groceries', code: 'D2', value: 250},
        {name: 'transport', text: 'Transport', code: 'D3', value: 250},
        {name: 'personal', text: 'Personal', code: 'D4', value: 250},
        {name: 'household', text: 'Household', code: 'D5', value: 250},
        {name: 'clothing', text: 'Clothing and Accessories', code: 'D6', value: 250},
        {name: 'work', text: 'Work or Study', code: 'D7', value: 250}
    ]

    var DSum = 1750;

    var bossValues = {
      BPV: 20000,
      BRATE: 12,
      BNPER: 260, // TODO admin setting
    };

    var BP = 20000;

    var armoryRanges = [
      {name: 'cash', text: 'Cash Savings', code: 'A1', min:0, max: 40000, value: 10000},
      {name: 'assets', text: 'Other Financial Assets', code: 'A2', min:0, max: 50000, value: 15000},
      {name: 'earning', text: 'Earning Capacity per Week', code: 'A3', min:0, max: 3000, value: 1000},
      {name: 'other', text: 'Other Earnings per year', code: 'A4', min:0, max: 20000, value: 5000},
    ];

    var AA = 25000;
    var AB = 1100;

    return {
      user: user,
      timeRanges: timeRanges,
      budgetDefaults: budgetDefaults,
      targets: targets,
      suspenseRanges: suspenseRanges,
      calcSSum: calcSSum,
      discretionRanges: discretionRanges,
      calcDSum: calcDSum,
      bossValues: bossValues,
      armoryRanges: armoryRanges,
      calcBoss: calcBoss,
    };

    function calcSSum() {
      let sum = 0;
      angular.forEach(suspenseRanges, function(r){
        sum += r.value;
      });
      return SSum = sum;
    }

    function calcDSum() {
      let sum = 0;
      angular.forEach(discretionRanges, function(r){
        sum += r.value;
      });
      return DSum = sum;
    }

    function calcBP() {
      // TODO Implement me
    }

    function calcArmory() {
      AA = armoryRanges[0] + armoryRanges[1];
      AB = armoryRanges[1] + (armoryRanges[2] / 52);
      return {AA: AA, AB: AB};
    }

    function calcBoss() {
      calcBP();
      calcArmory();
    }
  });
