describe("Conway", function() {
  var Conway = require('../lib/conway');

  describe('next_cell', function () {
    it("is 1", function() {
      expect(Conway.next_cell(3)).toEqual(1);
    });
  });
});
