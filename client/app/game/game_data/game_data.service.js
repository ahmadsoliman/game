'use strict';

angular.module('gameApp')
  .service('gameData', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var user = {};
    // default values for targets
    var targets = [
      { code: 0, name: 'house', time: 8, budget: 40000},
      { code: 1, name: 'travel', time: 5, budget: 2500},
      { code: 2, name: 'wedding', time: 3, budget: 40000}
    ];


    return {
      user: user,
      targets: targets,
      graph: graph
    };

    function graph() {
      console.log('GRAPH!');
    }
  });
