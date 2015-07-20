module.exports = (function () {
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
