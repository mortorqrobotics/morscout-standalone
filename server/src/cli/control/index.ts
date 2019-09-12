import blessed from "blessed";
import clear from "./clear";

//create layout and widgets
export default (screen: blessed.Widgets.Screen) => {
  screen.program.clear();
  screen.render();
  const bbox = blessed.box({
    height: "100%-1"
  });
  clear(
    blessed.box({
      parent: bbox,
      top: 0,
      left: 0
    })
  );
  screen.render();
  screen.append(bbox);
};
