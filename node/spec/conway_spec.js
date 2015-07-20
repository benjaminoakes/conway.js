var U = require('underscore');

describe('Conway', function() {
  var Conway = require('../lib/conway');

  describe('Cell.next', function () {
    describe('given a dead cell', function () {
      it('follows the "B3/S23" rules', function () {
        var results = U.range(0, 9).map(function (count) {
          return Conway.Cell.next(0, count);
        });

        expect(results).toEqual([0, 0, 0, 1, 0, 0, 0, 0, 0]);
      });
    });

    describe('given an alive cell', function () {
      it('follows the "B3/S23" rules', function () {
        var results = U.range(0, 9).map(function (count) {
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
        var grid = [[0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]];

        expect(Conway.Grid.countNeighbors(grid, 1, 1)).toEqual(0);
      });
    });

    describe('given a full neighborhood', function () {
      it('returns 8', function () {
        var grid = [[1, 1, 1],
                    [1, 1, 1],
                    [1, 1, 1]];

        expect(Conway.Grid.countNeighbors(grid, 1, 1)).toEqual(8);
      });
    });
  });

  describe('Grid.next', function () {
    it('returns the next state', function () {
      var grid, next;
      
      grid = [[1, 0, 0, 0],
              [0, 0, 0, 0],
              [1, 0, 1, 0],
              [0, 0, 0, 0]];

      next = [[0, 0, 0, 0],
              [0, 1, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0]];

      expect(Conway.Grid.next(grid)).toEqual(next);
    });
  });

  describe('Grid.generate', function () {
    it('returns a randomly generated grid of the requested size', function () {
      var grid = Conway.Grid.generate(8, 11);

      expect(grid.length).toEqual(11);
      expect(U.pluck(grid, 'length')).toEqual([8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]);
    });
  });
});
