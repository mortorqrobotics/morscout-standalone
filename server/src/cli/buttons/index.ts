import blessed from "blessed";
import installButton from "./install";

export default (screen: blessed.Widgets.Screen) => {
  const box = blessed.box({
    bottom: 0,
    right: 0,
    height: 1,
    shrink: true
  });
  installButton(box);
  screen.append(box);
};
