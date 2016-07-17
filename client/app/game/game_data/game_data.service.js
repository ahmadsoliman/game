'use strict';

angular.module('gameApp')
  .service('gameData', function ($localStorage) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var defaults = {
      user: {},
      timeRanges: [
        {name: 'house', text: 'Buy a House', min: 0, max: 10*52, value: 8*52},
        {name: 'travel', text: 'Travel Overseas', min: 0, max: 10*52, value: 5*52},
        {name: 'wedding', text: 'Pay for a Wedding', min: 0, max: 10*52, value: 3*52},
        {name: 'save', text: 'Save for a Rainy Day', min: 0, max: 10*52, value: 0},
        {name: 'buy', text: 'Buy Something Else', min: 0, max: 10*52, value: 0}
      ],
      budgetDefaults: [
        {value: 40000, increment: 5000},
        {value: 2500, increment: 500},
        {value: 40000, increment: 5000},
        {value: 3000, increment: 1000},
        {value: 5000, increment: 2500}
      ],
      // default values for targets
      targets: [
        { code: 0, name: 'house', time: 8*52, budget: 40000},
        { code: 1, name: 'travel', time: 5*52, budget: 2500},
        // { code: 2, name: 'wedding', time: 3*52, budget: 40000}
      ],
      suspenseRanges: [
        {name: 'rent', text: 'Rent or Mortgage Repayments', code: 'S1',  min: 0, max: 2000, value: 500, freq: 1},
        {name: 'mobile', text: 'Mobile and Internet', code: 'S2', min: 0, max: 200, value: 50, freq: 1},
        {name: 'utilities', text: 'Utilities', code: 'S3', min: 0, max: 200, value: 50, freq: 1},
        {name: 'health', text: 'Health and Other Insurance', code: 'S4', min: 0, max: 200, value: 50, freq: 1},
        {name: 'commitments', text: 'Other Regular Commitments', code: 'S5', min: 0, max: 200, value: 50, freq: 1}
      ],
      SSum: 90,
      discretionRanges: [
        {name: 'entertainment', text: 'Entertainment', code: 'D1', value: 250},
        {name: 'groceries', text: 'Groceries', code: 'D2', value: 250},
        {name: 'transport', text: 'Transport', code: 'D3', value: 250},
        {name: 'personal', text: 'Personal', code: 'D4', value: 250},
        {name: 'household', text: 'Household', code: 'D5', value: 250},
        {name: 'clothing', text: 'Clothing and Accessories', code: 'D6', value: 250},
        {name: 'work', text: 'Work or Study', code: 'D7', value: 250}
      ],
      DSum: 1750,
      bossValues: {
        BPV: 20000,
        BRATE: 12,
        BNPER: 260, // TODO admin setting
      },
      BP: 20000,
      armoryRanges: [
        {name: 'cash', text: 'Cash Savings', code: 'A1', min:0, max: 40000, value: 10000},
        {name: 'assets', text: 'Other Financial Assets', code: 'A2', min:0, max: 50000, value: 15000},
        {name: 'earning', text: 'Earning Capacity per Week', code: 'A3', min:0, max: 3000, value: 1000},
        {name: 'other', text: 'Other Earnings per year', code: 'A4', min:0, max: 20000, value: 5000},
      ],
      AA: 25000,
      AB: 1100,
      R: 0,
    };
    $localStorage.$default(defaults);

    return {
      user: $localStorage.user,
      timeRanges: $localStorage.timeRanges,
      budgetDefaults: $localStorage.budgetDefaults,
      targets: $localStorage.targets,
      suspenseRanges: $localStorage.suspenseRanges,
      calcSSum: calcSSum,
      discretionRanges: $localStorage.discretionRanges,
      calcDSum: calcDSum,
      calcR: calcR,
      bossValues: $localStorage.bossValues,
      armoryRanges: $localStorage.armoryRanges,
      calcBoss: calcBoss,
      testAllTargets: testAllTargets,
      reset: reset,
    };

    function calcSSum() {
      let sum = 0;
      angular.forEach($localStorage.suspenseRanges, function(r){
        sum += r.value;
      });
      $localStorage.SSum = sum;
      return sum;
    }

    function calcDSum() {
      let sum = 0;
      angular.forEach($localStorage.discretionRanges, function(r){
        sum += r.value;
      });
      $localStorage.DSum = sum;
      return sum;
    }

    function calcBP() {
      var bv = $localStorage.bossValues;
      $localStorage.BP = (bv.BRATE/5200.0 * bv.BPV) / (1 - Math.pow(1+bv.BRATE/5200.0, -1 * (bv.BNPER)));
      return $localStorage.BP;
    }

    function calcArmory() {
      $localStorage.AA = $localStorage.armoryRanges[0].value + $localStorage.armoryRanges[1].value;
      $localStorage.AB = $localStorage.armoryRanges[2].value + ($localStorage.armoryRanges[3].value / 52);
      return {AA: $localStorage.AA, AB: $localStorage.AB};
    }

    function calcR() {
      $localStorage.R = $localStorage.AB - $localStorage.DSum - $localStorage.SSum - $localStorage.BP;
      return $localStorage.R;
    }

    function calcBoss() {
      calcArmory();
      calcBP();
      calcR();
    }

    function calcCR(y) {
      return $localStorage.AA + (y * $localStorage.R);
    }

    function testTarget(t, subtractedVal) {
      return (calcCR(t.time) - subtractedVal - t.budget >= 0);
    }

    function testAllTargets() {
      var subtractedVal = 0;
      var results = $localStorage.results = {
        alive: true,
        DSum: $localStorage.DSum,
        SSum:$localStorage.SSum,
        R: $localStorage.R,
      };

      for(var i=0; i<$localStorage.targets.length; i++) {
        if(!testTarget($localStorage.targets[i], subtractedVal)) {
          results.alive = false;
          return results;
        }
        subtractedVal += $localStorage.targets[i].budget;
      }

      results.finalCR = $localStorage.AA + (260*$localStorage.R) - subtractedVal;

      return results;
    }

    function reset() {
      $localStorage.$reset();
      $localStorage.$default(defaults);
    }
  });
