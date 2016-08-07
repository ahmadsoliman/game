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

    $timeout(() => {
      $('#assets-range').range({
          min: vm.gameData.armoryRanges[1].min,
          max: vm.gameData.armoryRanges[1].max,
          start: vm.gameData.armoryRanges[1].value,
          step: vm.gameData.armoryRanges[1].step,
          onChange: (val) => { $timeout(() => vm.gameData.armoryRanges[1].value = val); }
      });
      $('#other-range').range({
          min: vm.gameData.armoryRanges[3].min,
          max: vm.gameData.armoryRanges[3].max,
          start: vm.gameData.armoryRanges[3].value,
          step: vm.gameData.armoryRanges[3].step,
          onChange: (val) => { $timeout(() => vm.gameData.armoryRanges[3].value = val); }
      });
    });

    // graph

    vm.series = [""];
    vm.data = {
      labels: [0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
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
    for(let i=0, j=0, subtractedVal=0; i<=10; i++) {
      if(j<vm.sortedTargets.length && i*26 == vm.sortedTargets[j].time) {
        subtractedVal += vm.sortedTargets[j].budget;
        j++;
      }
      vm.data.datasets[3].data[i] = vm.gameData.calcCR(26 * i) - subtractedVal;
    }

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
            }
          }]
        }
      }
    });
  }
}

angular.module('gameApp')
  .controller('ResultsController', ResultsController);
