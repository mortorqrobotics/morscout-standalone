import blessed from "blessed";
import contrib from "blessed-contrib";
import page1 from "./Log";
import page2 from "./Dashboard";

export const screen = blessed.screen({
  smartCSR: true,
  fullUnicode: true,
  dockBorders: true,
  ignoreDockContrast: true,
  title: "morscout"
});
screen.key(["escape", "C-c", "q"], function(ch, key) {
  screen.destroy();
  process.exit(0);
});

var carousel = new contrib.carousel([page1, page2], {
  screen: screen,
  interval: 0, //how often to switch views (set 0 to never swicth automatically)
  controlKeys: true //should right and left keyboard arrows control view rotation
});
carousel.start();
