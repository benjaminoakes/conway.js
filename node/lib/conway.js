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

  Grid.countNeighbors = countNeighbors;
  function countNeighbors(grid, x, y) {
    var neighborhood = extractNeighborhood(grid, x, y);
    return _.flatten(neighborhood).reduce(sum, 0);
  }

  Grid.next = next;
  function next(grid) {
    return grid.map(function (row, y) {
      return row.map(function (cell, x) {
        var neighborCount = countNeighbors(grid, x, y);
        return Conway.Cell.next(cell, neighborCount);
      });
    });
  }

  function randomCell() {
    return Math.random() > 0.5 ? 1 : 0;
  }

  Grid.generate = generate;
  function generate(width, height) {
    return _.range(0, height).map(function () {
      return _.range(0, width).map(function () {
        return randomCell();
      });
    });
  }

  return Grid;
}());

module.exports = Conway;
