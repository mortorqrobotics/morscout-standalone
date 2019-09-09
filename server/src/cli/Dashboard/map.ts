import blessed from "blessed";
import contrib from "blessed-contrib";

//create layout and widgets
export default grid => {
  var map = grid.set(0, 1, 1, 1, contrib.map, { label: "World Map" });
};
