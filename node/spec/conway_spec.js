var _ = require('underscore');

describe('Conway', function() {
  var Conway = require('../lib/conway');

  describe('Cell.next', function () {
    it('follows the "B3/S23" rules', function () {
      var results = _.range(0, 9).map(Conway.Cell.next);

      expect(results).toEqual([0, 0, 1, 1, 0, 0, 0, 0, 0]);
    });
  });
});
