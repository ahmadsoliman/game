'use strict';

(function() {

  class MainController {

    constructor($http, gameData) {
      this.vm = this;
      this.$http = $http;
      // this.awesomeThings = [];

      this.gameData = gameData;

      this.validData = false;

    }

    setGender(g) {
      this.validData = true;
      this.gameData.user.gender = g;
    }

    $onInit() {
      // this.$http.get('/api/things')
      //   .then(response => {
      //     this.awesomeThings = response.data;
      //   });
    }

    // addThing() {
    //   if (this.newThing) {
    //     this.$http.post('/api/things', {
    //       name: this.newThing
    //     });
    //     this.newThing = '';
    //   }
    // }
    //
    // deleteThing(thing) {
    //   this.$http.delete('/api/things/' + thing._id);
    // }
  }

  angular.module('gameApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'vm'
    });
})();
