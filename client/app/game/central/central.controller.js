'use strict';

class CentralController {
  constructor(Auth, $state, $timeout, gameData) {
    var vm = this;
    vm.$timeout = $timeout;

    vm.gameData = gameData;

    vm.gameData.calcAll();
    vm.gameResults = vm.gameData.testAllTargets();
    vm.gameResults.total = vm.gameResults.R + vm.gameResults.DSum + vm.gameResults.SSum;
    vm.gameResults.R = Math.round(vm.gameResults.R);

    vm.flags = vm.gameData.centralFlags;

    vm.timeSelected = 0;

    $timeout(() => {
      $('#time-range').range({
          min: 0,
          max: 5,
          start: vm.timeSelected,
          step: 0.5,
          onChange: (val) => $timeout(() => {
            vm.timeSelected = val;

            vm.currentSavings = Math.round(vm.data.datasets[2].data[vm.timeSelected*2]);
            vm.currentDebt = Math.round(-1*vm.data.datasets[3].data[vm.timeSelected*2]);
            if(vm.currentSavings < 0) {
              vm.currentDebt -= vm.currentSavings;
              vm.currentSavings = 0;
            }

            let width = 0;
            switch(vm.timeSelected) {
              case 0: width = '70%'; break;
              case 0.5: width = '64%'; break;
              case 1: width = '57%'; break;
              case 1.5: width = '50%'; break;
              case 2: width = '43%'; break;
              case 2.5: width = '36%'; break;
              case 3: width = '29%'; break;
              case 3.5: width = '22.5%'; break;
              case 4: width = '16%'; break;
              case 4.5: width = '9%'; break;
              case 5: width = '0%'; break;
            }
            $('#time-hider').width(width);
          })
      });
    });

    // graph

    vm.series = [""];
    vm.data = {
      labels: [0,,1,,2,,3,,4,,5],
      datasets: [{
        type: 'bar', //debt
        label: 'loan',
        backgroundColor: '#B70D00',
        data: [0,0,0,0,0,0,0,0,0,0,0,0],
      }, {
        type: 'bar', //savings bar
        label: 'savings',
        backgroundColor: '#607D8B',
        data: [0,0,0,0,0,0,0,0,0,0,0,0],
      }, { //savings graph
        type: 'line',
        label: 'CR values',
        data: [],
        backgroundColor: '#494949',
      }, { // debt graph
        type: 'line',
        label: 'Closing balance values',
        backgroundColor: 'rgba(124,10,2,0.5)',//'#780800',
        data: []
      }]
    };

    vm.gameData.targets.forEach(() => vm.data.datasets.push(
      { // goal
        type: 'bar',
        label: 'dataset 1',
        backgroundColor: "#607D8B",
        data: [0,0,0,0,0,0,0,0,0,0,0,0],
      }
    ));

    vm.sortedTargets = angular.copy(vm.gameData.targets);

    function compareTargets(a,b) {
      if (a.time < b.time) {
        return -1;
      }
      if (a.time > b.time) {
        return 1;
      }
      return 0;
    }

    vm.sortedTargets.sort(compareTargets);

    // set bar chart data, change datasets to include more targets if needed
    for(let i=0, j=0; i<vm.sortedTargets.length; i++) {
      while(vm.data.datasets[4+j].data[vm.sortedTargets[i].time/26] != 0) {
        j++;
      }
      vm.data.datasets[4+j].data[vm.sortedTargets[i].time/26] = -1*vm.sortedTargets[i].budget;
      j=0;
    }

    // set line chart data
    vm.data.datasets[0].data[0] = -1*vm.gameData.bossValues.BPV;
    vm.data.datasets[1].data[0] = vm.gameData.savingsBalance[0];
    for(let i=0, j=0, subtractedVal=0; i<=10; i++) {
      while(j<vm.sortedTargets.length && i*26 == vm.sortedTargets[j].time) {
        subtractedVal += vm.sortedTargets[j].budget;
        j++;
      }
      // savings
      vm.data.datasets[2].data[i] = vm.gameData.savingsBalance[26 * i] - subtractedVal;
      // debt
      vm.data.datasets[3].data[i] = vm.gameData.closingBalance[i*26];
      if(vm.data.datasets[2].data[i] < 0) {
        vm.data.datasets[3].data[i] += vm.data.datasets[3].data[i];
        vm.data.datasets[2].data[i] = 0;
      }
    }

    // init graph
    var ctx = document.getElementById("canvas").getContext("2d");
    vm.chart = new Chart(ctx, {
      type: 'bar',
      data: vm.data,
      options: {
        legend: {
          display: false
        },
        tooltips: {
          mode: 'label',
          enabled: false
        },
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true,
              offsetGridLines: false,
              color: 'rgba(255,255,255,0)'
            }
          }],
          yAxes: [{
            stacked: true,
    				ticks: {
              beginAtZero: true,
              userCallback: function(value, index, values) {
                  return  '';
                  // return '$ ' + value.toLocaleString();
                }
            },
            gridLines: {
              display: true,
              offsetGridLines: true,
              color: 'rgba(255,255,255,0)'
            }
          }]
        }
      }
    });

  }

}

angular.module('gameApp')
  .controller('CentralController', CentralController);
