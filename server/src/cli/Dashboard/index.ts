import blessed from "blessed";
import contrib from "blessed-contrib";
import map from "./map";
import resources from "./resources";

//create layout and widgets
export default (screen: blessed.Widgets.Screen) => {
  screen.program.clear();
  screen.render();
  var grid = new contrib.grid({ rows: 1, cols: 2, screen });
  map(grid);
  resources(grid);
};
