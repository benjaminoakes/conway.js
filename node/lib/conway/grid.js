var U = require("underscore"),
  Cell = require("./cell");

module.exports = (function () {
  var Grid = {};

  function randomCell() {
    return Math.random() > 0.5 ? 1 : 0;
  }

  Grid.generate = generate;
  function generate(width, height) {
    return U.range(0, height).map(function () {
      return U.range(0, width).map(function () {
        return randomCell();
      });
    });
  }

  Grid.displayable = displayable;
  function displayable(grid) {
    var rows;
    
    rows = grid.map(function (row) {
      return row.
        map(function (cell) { return 1 === cell ? "•" : " "; }).
        join("");
    });

    return rows.join("\n");
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

  function sum(accumulator, e) {
    return accumulator + e;
  }

  Grid.countNeighbors = countNeighbors;
  function countNeighbors(grid, x, y) {
    var neighborhood = extractNeighborhood(grid, x, y);
    return U.flatten(neighborhood).reduce(sum, 0);
  }

  Grid.next = next;
  function next(grid) {
    return grid.map(function (row, y) {
      return row.map(function (cell, x) {
        var neighborCount = countNeighbors(grid, x, y);
        return Cell.next(cell, neighborCount);
      });
    });
  }

  Grid.step = step;
  function step(grid, generation, callback) {
    var newGrid;
    
    if (0 === generation) {
      return;
    } else {
      newGrid = next(grid);
      callback(newGrid);
      step(newGrid, generation - 1, callback);
    }
  }

  return Grid;
}());
