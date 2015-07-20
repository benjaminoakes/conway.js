var Immutable = require('immutable');

var Conway = (function () {
  function next_cell() {
    return 1;
  }

  return {
    next_cell: next_cell
  };
}());

module.exports = Conway;
