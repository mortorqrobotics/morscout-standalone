import blessed from "blessed";
import contrib from "blessed-contrib";
import page1 from "./log";
import page2 from "./dashboard";
import page3 from "./control";
import buttons from "./buttons";

export const screen = blessed.screen({
  smartCSR: true,
  fullUnicode: true,
  dockBorders: true,
  ignoreDockContrast: true,
  title: "morscout"
});
screen.key(["escape", "C-c", "q"], (ch, key) => {
  screen.destroy();
  process.exit(0);
});

var carousel = new contrib.carousel([page1, page2, page3], {
  screen: screen,
  interval: 0, //how often to switch views (set 0 to never swicth automatically)
  controlKeys: true //should right and left keyboard arrows control view rotation
});
carousel.start();

buttons(screen);
screen.key(["right", "left", "home", "end"], () => {
  setImmediate(() => buttons(screen));
});
