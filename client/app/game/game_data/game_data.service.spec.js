'use strict';

describe('Service: gameData', function () {

  // load the service's module
  beforeEach(module('gameApp.game_data'));

  // instantiate service
  var gameData;
  beforeEach(inject(function (_gameData_) {
    gameData = _gameData_;
  }));

  it('should do something', function () {
    expect(!!gameData).toBe(true);
  });

});
