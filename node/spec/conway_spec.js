describe('Conway', function() {
  var Conway = require('../lib/conway');

  describe('Cell.next', function () {
    it('is 1', function() {
      expect(Conway.Cell.next(3)).toEqual(1);
    });
  });
});
