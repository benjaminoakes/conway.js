var Immutable = require('immutable'),
  U = require('underscore');

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
    return U.flatten(neighborhood).reduce(sum, 0);
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
        map(function (cell) { return 1 === cell ? '•' : ' '; }).
        join('');
    });

    return rows.join('\n');
  }

  return Grid;
}());

Conway.CLI = (function () {
  var CLI = {};

  function step(grid, generation, callback) {
    var newGrid;
    
    if (0 === generation) {
      return;
    } else {
      newGrid = Conway.Grid.next(grid);
      callback(newGrid);
      step(newGrid, generation - 1, callback);
    }
  }

  function show_usage() {
    console.log('Usage: conway width height generations');
  }

  function run(width, height, generations) {
    var initialGrid;

    initialGrid = Conway.Grid.generate(width, height);

    step(initialGrid, generations, function (grid) {
      console.log(Conway.Grid.displayable(grid));
    });
  }

  CLI.main = main;
  function main(argv) {
    var parsed;

    parsed = argv.slice(2, 5).map(function (s) {
      return parseInt(s, 10);
    });

    if (3 === parsed.length) {
      run(parsed[0], parsed[1], parsed[2]);
    } else {
      show_usage();
    }
  }

  return CLI;
}());

module.exports = Conway;
