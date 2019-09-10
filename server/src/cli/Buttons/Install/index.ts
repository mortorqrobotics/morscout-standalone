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
        }
      }
    });
    button.on("press", async () => {
      button.setContent("{green-bg}Installing{/green-bg}");
      await install();
      button.destroy();
      installed = true;
    });
  }
};
