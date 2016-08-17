'use strict';

class ResultsController {
  constructor($timeout, gameData) {
    var vm = this;
    vm.gameData = gameData;

    vm.gameData.calcAll();
    vm.gameResults = vm.gameData.testAllTargets();

    vm.results = [
      { name: 'discretion', text: 'Discretion', value: vm.gameResults.DSum },
      { name: 'suspense', text: 'Suspense', value: vm.gameResults.SSum },
      { name: 'reserve', text: 'Reserve', value: vm.gameResults.R }
    ];

    // $timeout(() => {
    //   $('#assets-range').range({
    //       min: vm.gameData.armoryRanges[1].min,
    //       max: vm.gameData.armoryRanges[1].max,
    //       start: vm.gameData.armoryRanges[1].value,
    //       step: vm.gameData.armoryRanges[1].step,
    //       onChange: (val) => { $timeout(() => vm.gameData.armoryRanges[1].value = val); }
    //   });
    // });

    // graph

    vm.series = [""];
    vm.data = {
      labels: [0,,1,,2,,3,,4,,5],
      datasets: [{
        type: 'bar',
        label: 'dataset 1',
        backgroundColor: "grey",
        data: [0,0,0,0,0,0,0,0,0,0,0,0],
        // borderColor: 'white'
      }, {
        type: 'bar',
        label: 'dataset 2',
        // backgroundColor: "grey",
        data: [0,0,0,0,0,0,0,0,0,0,0,0],
        // borderColor: 'white'
      }, {
        type: 'bar',
        label: 'dataset 3',
        backgroundColor: "black",
        data: [0,0,0,0,0,0,0,0,0,0,0,0],
        // borderColor: 'white'
      }, {
        type: 'line',
        label: 'CR values',
        data: []
      }, {
        type: 'line',
        label: 'Closing balance values',
        backgroundColor: 'rgba(255,0,0,0.2)',
        data: []
      }, {
        type: 'bar',
        label: 'loan',
        backgroundColor: 'rgba(255,0,0,0.5)',
        data: [0,0,0,0,0,0,0,0,0,0,0,0],
        // borderColor: 'white'
      }]
    };

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
    window.lol = vm.sortedTargets;

    // set bar chart data, change datasets to include more targets if needed
    for(let i=0, j=0; i<vm.sortedTargets.length; i++) {
      while(vm.data.datasets[j].data[vm.sortedTargets[i].time/26] != 0) {
        j++;
      }
      vm.data.datasets[j].data[vm.sortedTargets[i].time/26] = vm.sortedTargets[i].budget;
      j=0;
    }

    // set line chart data
    vm.data.datasets[5].data[0] = -1*vm.gameData.bossValues.BPV;
    for(let i=0, j=0, subtractedVal=0; i<=10; i++) {
      if(j<vm.sortedTargets.length && i*26 == vm.sortedTargets[j].time) {
        subtractedVal += vm.sortedTargets[j].budget;
        j++;
      }
      vm.data.datasets[3].data[i] = vm.gameData.calcCR(26 * i) - subtractedVal;
      vm.data.datasets[4].data[i] = vm.gameData.closingBalance[i*26];
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
              offsetGridLines: true
            }
          }],
          yAxes: [{
            stacked: true,
    				ticks: {
              beginAtZero: true,
              userCallback: function(value, index, values) {
                  return '$ ' + value.toLocaleString();
                }
            }
          }]
        }
      }
    });
  }
}

angular.module('gameApp')
  .controller('ResultsController', ResultsController);
