'use strict';

angular.module('gameApp')
  .service('gameData', function ($localStorage, $location, $window) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var defaults = {
      user: {},
      timeRanges: [
        {name: 'house', text: 'House Deposit', min: 26, max: 5*52, value: 4*52},
        {name: 'travel', text: 'Overseas Trip', min: 26, max: 5*52, value: 4*52},
        {name: 'wedding', text: 'Wedding', min: 26, max: 5*52, value: 3*52},
        {name: 'car', text: 'New Car', min: 26, max: 5*52, value: 3*52},
        {name: 'other', text: 'Something Else', min: 26, max: 5*52, value: 3*52}
      ],
      budgetDefaults: [
        {min: 5000, max: 50000, step: 2500, value: 15000},
        {min: 1000, max: 20000, step: 1000, value: 5000},
        {min: 5000, max: 50000, step: 2500, value: 15000},
        {min: 2500, max: 50000, step: 2500, value: 15000},
        {min: 2500, max: 50000, step: 2500, value: 15000},
      ],
      // default values for targets
      targets: [
        { code: 0, name: 'house', time: 4*52, budget: 15000}
      ],
      suspenseRanges: [
        {name: 'rent', text: 'Rent / Mortgage', code: 'S1', min: 0, max: 1000, value: 0, step: 50, freq: 1},
        {name: 'mobile', text: 'Mobile / Internet', code: 'S2', min: 0, max: 100, value: 0, step: 5, freq: 1},
        {name: 'utilities', text: 'Rates / Power / Other Utilities', code: 'S3', min: 0, max: 100, value: 0, step: 5, freq: 1},
        {name: 'health', text: 'Car / Health / Other Insurance', code: 'S4', min: 0, max: 100, value: 0, step: 5, freq: 1},
        {name: 'commitments', text: 'Other Regular Commitments', code: 'S5', min: 0, max: 200, value: 0, step: 10, freq: 1}
      ],
      SSum: 0,
      discretionRanges: [
        {name: 'entertainment', text: 'Entertainment', code: 'D1', min: 0, max: 400, value: 0, step: 25},
        {name: 'groceries', text: 'Groceries', code: 'D2', min: 0, max: 300, value: 0, step: 25},
        {name: 'transport', text: 'Transport', code: 'D3', min: 0, max: 200, value: 0, step: 10},
        {name: 'personal', text: 'Personal / Sports / Health / Cosmetics', code: 'D4', min: 0, max: 200, value: 0, step: 10},
        {name: 'household', text: 'Household / Family / Pets', code: 'D5', min: 0, max: 200, value: 0, step: 10},
        {name: 'clothing', text: 'Clothing / Shoes / Accessories', code: 'D6', min: 0, max: 200, value: 0, step: 10},
        {name: 'work', text: 'Work / Coffees / Lunches / Study', code: 'D7', min: 0, max: 200, value: 0, step: 10}
      ],
      DSum: 0,
      incomeRanges: [
        {name: 'job', text: 'Other job'},
        {name: 'tax', text: 'Tax refund'},
        {name: 'gifts', text: 'Gifts from family'},
        {name: 'freelance', text: 'Freelance income'},
        {name: 'investments', text: 'Income from investments'},
        {name: 'other', text: 'Other'},
      ],
      otherEarnings: [],
      bossValues: {
        BPV: 0,
        BRATE: 5,
        BNPER: 260, // TODO admin setting
      },
      closingBalance: [],
      savingsBalance: [],
      BP: 0,
      armoryRanges: [
        {name: 'cash', text: 'Cash Savings', code: 'A1', min:0, max: 40000, step: 500, value: 0},
        {name: 'assets', text: 'Other Financial Assets', code: 'A2', min:0, max: 40000, step: 500, value: 0},
        {name: 'earning', text: 'Earning Capacity per Week', code: 'A3', min:0, max: 2000, step: 100, value: 0},
        {name: 'other', text: 'Other Earnings per year', code: 'A4', min:0, max: 40000, step: 500, value: 0},
        {name: 'savings-interest', text: 'Cash Savings Interest', code: 'A5', min:0, max: 25, step: 1, value: 0},
      ],
      AA: 0,
      AB: 0,
      R: 0,
      centralFlags: {},
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
      getBP: getBP,
      calcR: calcR,
      bossValues: $localStorage.bossValues,
      armoryRanges: $localStorage.armoryRanges,
      centralFlags: $localStorage.centralFlags,
      getEarnings: getEarnings,
      incomeRanges: $localStorage.incomeRanges,
      otherEarnings: $localStorage.otherEarnings,
      closingBalance: $localStorage.closingBalance,
      savingsBalance: $localStorage.savingsBalance,
      calcAll: calcAll,
      calcCR: calcCR,
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
      var weeklyInterest = bv.BRATE/5200.0;
      $localStorage.BP = (weeklyInterest * bv.BPV) / (1 - Math.pow(1+weeklyInterest, -1 * (bv.BNPER)));

      $localStorage.closingBalance[0] = -1*bv.BPV;
      for(let i=1; i<=bv.BNPER; i++) {
        $localStorage.closingBalance[i] = $localStorage.closingBalance[i-1] +
          $localStorage.closingBalance[i-1]*weeklyInterest + $localStorage.BP;
      }
      return $localStorage.BP;
    }

    function getBP() {
      return $localStorage.BP;
    }

    function calcArmory() {
      $localStorage.AA = $localStorage.armoryRanges[0].value + $localStorage.armoryRanges[1].value;
      $localStorage.AB = $localStorage.armoryRanges[2].value + ($localStorage.armoryRanges[3].value / 52);
      return {AA: $localStorage.AA, AB: $localStorage.AB};
    }

    function getEarnings() {
      return $localStorage.AB;
    }

    function calcR() {
      $localStorage.R = $localStorage.AB - $localStorage.DSum - $localStorage.SSum;
      return $localStorage.R;
    }

    function calcSavings() {
      $localStorage.savingsBalance[0] = $localStorage.AA;
      for(let i=1; i<=$localStorage.bossValues.BNPER; i++) {
        $localStorage.savingsBalance[i] = $localStorage.savingsBalance[i-1] +
          $localStorage.R - $localStorage.BP +
          ($localStorage.savingsBalance[i-1] * $localStorage.armoryRanges[4].value / 5200);
      }
    }

    function calcAll() {
      calcSSum();
      calcDSum();
      calcBP();
      calcArmory();
      calcR();
      calcSavings();
    }

    function calcCR(y) {
      calcSavings();
      return $localStorage.savingsBalance[y];
    }

    function testTarget(t, subtractedVal) {
      return (calcCR(t.time) - subtractedVal - t.budget >= 0);
    }

    function testAllTargets() {
      var subtractedVal = 0;
      var totalBudget = 0;
      $localStorage.targets.forEach(function(t) {
        totalBudget += t.budget;
      });
      var results = $localStorage.results = {
        alive: true,
        DSum: $localStorage.DSum,
        SSum: $localStorage.SSum,
        R: $localStorage.R,
        finalCR: calcCR(260) - totalBudget,
      };

      for(var i=0; i<$localStorage.targets.length; i++) {
        if(!testTarget($localStorage.targets[i], subtractedVal)) {
          results.alive = false;
          return results;
        }
        subtractedVal += $localStorage.targets[i].budget;
      }

      return results;
    }

    function reset() {
      console.log($localStorage.targets);
      $localStorage.$reset();
      console.log($localStorage);
      $localStorage.$default(defaults);
      console.log($localStorage.targets);
      $location.path('/main');
      $window.location.reload();

    }
  });
