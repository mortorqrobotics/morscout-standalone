import blessed from "blessed";
import contrib from "blessed-contrib";
import map from "./map";
import resources from "./resources";
import config from "config";

//create layout and widgets
export default (screen: blessed.Widgets.Screen) => {
  screen.program.clear();
  screen.render();
  const bbox = blessed.box({
    height: "100%-1"
  });
  screen.render();
  map(
    blessed.box({
      width: "50%",
      parent: bbox
    })
  );
  resources(
    blessed.box({
      width: "50%",
      right: 0,
      parent: bbox
    })
  );
  screen.append(bbox);
};
