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
  function next(neighborCount) {
    if (neighborCount == 2 || neighborCount == 3) {
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

  // A neighborhood is a special case of a grid
  Grid.countNeighbors = countNeighbors;
  function countNeighbors(grid) {
    var neighborhood = extractNeighborhood(grid, 1, 1);
    return _.flatten(neighborhood).reduce(sum, 0);
  }

  return Grid;
}());

module.exports = Conway;
