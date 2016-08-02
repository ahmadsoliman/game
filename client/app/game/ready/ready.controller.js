'use strict';

class ReadyController {
  constructor(gameData) {
    var vm = this;
    vm.gameData = gameData;

    vm.labels = [];
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

    for(let i=0, j=0; i<vm.sortedTargets.length; i++){
      while(vm.data.datasets[j].data[vm.sortedTargets[i].time/26] != 0) j++;
      vm.data.datasets[j].data[vm.sortedTargets[i].time/26] = vm.sortedTargets[i].budget;
      j=0;
    }
    window.labels = vm.labels;
    window.data = vm.data;

    var ctx = document.getElementById("canvas").getContext("2d");
    vm.chart = new Chart(ctx, {
      type: 'bar',
      data: data,
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
  .controller('ReadyController', ReadyController);
