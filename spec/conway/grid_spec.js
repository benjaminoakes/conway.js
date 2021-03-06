var U = require("underscore"),
  Grid = require("../../lib/conway/grid");

describe("Grid.extractNeighborhood", function () {
  it("extracts the neighborhood around a set of coordinates, treating edges and the center like dead cells", function () {
    var grid = [[1, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0]];

    expect(Grid.extractNeighborhood(grid, 0, 0)).toEqual([[0, 0, 0],
                                                          [0, 0, 0],
                                                          [0, 0, 0]]);
    expect(Grid.extractNeighborhood(grid, 1, 1)).toEqual([[1, 0, 0],
                                                          [0, 0, 0],
                                                          [0, 0, 1]]);
    expect(Grid.extractNeighborhood(grid, 0, 3)).toEqual([[0, 0, 0],
                                                          [0, 0, 0],
                                                          [0, 0, 0]]);
    expect(Grid.extractNeighborhood(grid, 3, 3)).toEqual([[1, 0, 0],
                                                          [0, 0, 0],
                                                          [0, 0, 0]]);
  });
});

describe("Grid.countNeighbors", function () {
  describe("given an empty neighborhood", function () {
    it("returns 0", function () {
      var grid = [[0, 0, 0],
                  [0, 0, 0],
                  [0, 0, 0]];

      expect(Grid.countNeighbors(grid, 1, 1)).toEqual(0);
    });
  });

  describe("given a full neighborhood", function () {
    it("returns 8", function () {
      var grid = [[1, 1, 1],
                  [1, 1, 1],
                  [1, 1, 1]];

      expect(Grid.countNeighbors(grid, 1, 1)).toEqual(8);
    });
  });
});

describe("Grid.next", function () {
  it("returns the next state", function () {
    var grid, next;
    
    grid = [[1, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 0, 1, 0],
            [0, 0, 0, 0]];

    next = [[0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]];

    expect(Grid.next(grid)).toEqual(next);
  });
});

describe("Grid.generate", function () {
  it("returns a randomly generated grid of the requested size", function () {
    var grid = Grid.generate(8, 11);

    expect(grid.length).toEqual(11);
    expect(U.pluck(grid, "length")).toEqual([8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]);
  });
});

describe("Grid.displayable", function () {
  it("returns sparse display of the grid", function () {
    var grid;
    
    grid = [[1, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 0, 1, 0],
            [0, 0, 0, 0]];

    expect(Grid.displayable(grid)).toEqual("•   \n    \n• • \n    ");
  });
});

describe("Grid.generate", function () {
  it("returns a randomly generated grid of the requested size", function () {
    var grid = Grid.generate(8, 11);

    expect(grid.length).toEqual(11);
    expect(U.pluck(grid, "length")).toEqual([8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]);
  });
});
