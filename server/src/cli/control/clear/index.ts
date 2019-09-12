import blessed from "blessed";
import install from "./action";

export default (box: blessed.Widgets.BoxElement) => {
  const button = blessed.button({
    parent: box,
    mouse: true,
    keys: true,
    shrink: true,
    name: "Clear",
    content: "Clear",
    style: {
      fg: "black",
      bg: "yellow",
      hover: {
        bg: "red"
      },
      focus: {
        bg: "blue",
        hover: { bg: "blue" }
      }
    }
  });
  button.on("press", async () => {
    button.setContent("Clearing");
    await install();
    button.destroy();
  });
};
