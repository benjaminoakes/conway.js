var _ = require('underscore');

describe('Conway', function() {
  var Conway = require('../lib/conway');

  describe('Cell.next', function () {
    describe('given a dead cell', function () {
      it('follows the "B3/S23" rules', function () {
        var results = _.range(0, 9).map(function (count) {
          return Conway.Cell.next(0, count);
        });

        expect(results).toEqual([0, 0, 0, 1, 0, 0, 0, 0, 0]);
      });
    });

    describe('given an alive cell', function () {
      it('follows the "B3/S23" rules', function () {
        var results = _.range(0, 9).map(function (count) {
          return Conway.Cell.next(1, count);
        });

        expect(results).toEqual([0, 0, 1, 1, 0, 0, 0, 0, 0]);
      });
    });
  });

  describe('Grid.extractNeighborhood', function () {
    it('extracts the neighborhood around a set of coordinates, treating edges and the center like dead cells', function () {
      var grid = [[1, 0, 0, 0],
                  [0, 0, 0, 0],
                  [0, 0, 1, 0],
                  [0, 0, 0, 0]];

      expect(Conway.Grid.extractNeighborhood(grid, 0, 0)).toEqual([[0, 0, 0],
                                                                   [0, 0, 0],
                                                                   [0, 0, 0]]);
      expect(Conway.Grid.extractNeighborhood(grid, 1, 1)).toEqual([[1, 0, 0],
                                                                   [0, 0, 0],
                                                                   [0, 0, 1]]);
      expect(Conway.Grid.extractNeighborhood(grid, 0, 3)).toEqual([[0, 0, 0],
                                                                   [0, 0, 0],
                                                                   [0, 0, 0]]);
      expect(Conway.Grid.extractNeighborhood(grid, 3, 3)).toEqual([[1, 0, 0],
                                                                   [0, 0, 0],
                                                                   [0, 0, 0]]);
    });
  });

  describe('Grid.countNeighbors', function () {
    describe('given an empty neighborhood', function () {
      it('returns 0', function () {
        var neighborhood = [[0, 0, 0],
                            [0, 0, 0],
                            [0, 0, 0]];

        expect(Conway.Grid.countNeighbors(neighborhood)).toEqual(0);
      });
    });

    describe('given a full neighborhood', function () {
      it('returns 8', function () {
        var neighborhood = [[1, 1, 1],
                            [1, 0, 1],
                            [1, 1, 1]];
        expect(Conway.Grid.countNeighbors(neighborhood)).toEqual(8);
      });
    });
  });
});
