import blessed from "blessed";
import contrib from "blessed-contrib";

//create layout and widgets
export default (box: blessed.Widgets.BoxElement) => {
  return contrib.map({
    label: "World Map",
    parent: box,
    border: {
      type: "line"
    }
  });
};
