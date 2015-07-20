var Immutable = require('immutable');

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
  Cell.next = function next(neighborCount) {
    if (neighborCount == 2 || neighborCount == 3) {
      return 1;
    } else {
      return 0;
    }
  };

  return Cell;
}());

module.exports = Conway;
