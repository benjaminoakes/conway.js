var U = require("underscore"),
  Cell = require("../../lib/conway/cell");

describe("Cell.next", function () {
  describe("given a dead cell", function () {
    it('follows the "B3/S23" rules', function () {
      var results = U.range(0, 9).map(function (count) {
        return Cell.next(0, count);
      });

      expect(results).toEqual([0, 0, 0, 1, 0, 0, 0, 0, 0]);
    });
  });

  describe("given an alive cell", function () {
    it('follows the "B3/S23" rules', function () {
      var results = U.range(0, 9).map(function (count) {
        return Cell.next(1, count);
      });

      expect(results).toEqual([0, 0, 1, 1, 0, 0, 0, 0, 0]);
    });
  });
});
