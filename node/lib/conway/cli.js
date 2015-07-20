var Grid = require("./grid");

module.exports = (function () {
  var CLI = {};

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

  function run(width, height, generations) {
    var initialGrid;

    initialGrid = Grid.generate(width, height);

    Grid.step(initialGrid, generations, function (grid) {
      console.log(Grid.displayable(grid));
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
