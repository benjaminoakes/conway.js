var Immutable = require('immutable'),
  _ = require('underscore');

var Conway = {};

Conway.Cell = (function () {
  var Cell = {};

  // Rules:
  //
  //   * Any live cell with fewer than two live neighbours dies, as if caused
  //     by under-population.
  //   * Any live cell with two or three live neighbours lives on to the next 
  //     generation.
  //   * Any live cell with more than three live neighbours dies, as if by 
  //     overcrowding.
  //   * Any dead cell with exactly three live neighbours becomes a live cell,
  //     as if by reproduction.
  //
  Cell.next = next;
  function next(cell, neighborCount) {
    if (1 === cell && 2 === neighborCount) {
      return 1;
    } else if (3 === neighborCount) {
      return 1;
    } else {
      return 0;
    }
  }

  return Cell;
}());

Conway.Grid = (function () {
  var Grid = {};

  function sum(accumulator, e) {
    return accumulator + e;
  }

  Grid.extractNeighborhood = extractNeighborhood;
  function extractNeighborhood(grid, x, y) {
    return [-1, 0, +1].map(function (displaceY) {
      return [-1, 0, +1].map(function (displaceX) {
        var row, cell;
        
        row = grid[y + displaceY];

        if (row) {
          cell = row[x + displaceX];

          if (0 === displaceX && 0 === displaceY) {
            return 0;
          } else {
            return cell ? cell : 0;
          }
        } else {
          return 0;
        }
      });
    });
  }

  // Assumes neighborhood is the result of extractNeighborhood()
  Grid.countNeighbors = countNeighbors;
  function countNeighbors(neighborhood) {
    return _.flatten(neighborhood).reduce(sum, 0);
  }

  Grid.next = next;
  function next(grid) {
    return grid.map(function (row, y) {
      return row.map(function (cell, x) {
        var neighborhood, neighborCount;
        
        neighborhood = extractNeighborhood(grid, x, y);
        neighborCount = countNeighbors(neighborhood);

        return Conway.Cell.next(cell, neighborCount);
      });
    });
  }

  return Grid;
}());

module.exports = Conway;
