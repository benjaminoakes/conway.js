var Grid = require("./grid");

module.exports = (function () {
  var CLI = {};

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

  function run(width, height, generationsCount) {
    var initialGrid;

    initialGrid = Grid.generate(width, height);

    Grid.step(initialGrid, generationsCount, function (grid) {
      console.log(Grid.displayable(grid));
    });
  }

  function show_usage() {
    var text = [
      "Usage: conway width height generations",
      "",
      "Runs a simulation of Conway's Game of Life",
      "",
      "More information: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
    ].join("\n");

    console.log(text);
  }

  return CLI;
}());
