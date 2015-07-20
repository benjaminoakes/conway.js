var _ = require('underscore');

describe('Conway', function() {
  var Conway = require('../lib/conway');

  describe('Cell.next', function () {
    it('follows the "B3/S23" rules', function () {
      var results = _.range(0, 9).map(Conway.Cell.next);

      expect(results).toEqual([0, 0, 1, 1, 0, 0, 0, 0, 0]);
    });
  });

  describe('Grid.neighborhood', function () {
    it('extracts the neighborhood around a set of coordinates, treating edges like dead cells', function () {
      var grid = [[1, 0, 0, 0],
                  [0, 0, 0, 0],
                  [0, 0, 1, 0],
                  [0, 0, 0, 0]];

      expect(Conway.Grid.neighborhood(grid, 0, 0)).toEqual([[0, 0, 0],
                                                            [0, 1, 0],
                                                            [0, 0, 0]]);
      expect(Conway.Grid.neighborhood(grid, 1, 1)).toEqual([[1, 0, 0],
                                                            [0, 0, 0],
                                                            [0, 0, 1]]);
      expect(Conway.Grid.neighborhood(grid, 0, 3)).toEqual([[0, 0, 0],
                                                            [0, 0, 0],
                                                            [0, 0, 0]]);
      expect(Conway.Grid.neighborhood(grid, 3, 3)).toEqual([[1, 0, 0],
                                                            [0, 0, 0],
                                                            [0, 0, 0]]);
    });
  });
});
