var Immutable = require('immutable');

var Conway = {};

Conway.Cell = (function () {
  var Cell = {};

  Cell.next = function next(neighborCount) {
    return 1;
  };

  return Cell;
}());

module.exports = Conway;
