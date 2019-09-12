import blessed from "blessed";
import install from "./action";
let installed = false;
export default (box: blessed.Widgets.BoxElement) => {
  if (!installed) {
    const button = blessed.button({
      parent: box,
      mouse: true,
      keys: true,
      shrink: true,
      right: 0,
      bottom: 0,
      name: "Install",
      content: "Install",
      style: {
        bg: "blue",
        hover: {
          bg: "red"
        },
        focus: {
          bg: "green",
          hover: { bg: "green" }
        }
      }
    });
    button.on("press", async () => {
      button.setContent("Installing");
      await install();
      button.destroy();
      installed = true;
    });
  }
};
