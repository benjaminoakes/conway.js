var Cell = require("./conway/cell"),
  Grid = require("./conway/grid"),
  CLI = require("./conway/cli");

var Conway = {
  Cell: Cell,
  Grid: Grid,
  CLI:  CLI
};

module.exports = Conway;
