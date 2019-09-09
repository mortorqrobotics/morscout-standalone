import blessed from "blessed";
import contrib from "blessed-contrib";
import os from "os";
import config from "config";

export default grid => {
  const donut = grid.set(0, 0, 1, 1, contrib.donut, {
    label: "Resources",
    radius: 8,
    arcWidth: 3,
    remainColor: "black",
    yPadding: 2
  });
  donut.on("show", () => config.logger.info("Attached"));
  const render = () => {
    const getColor = percent => {
      if (percent > 90) return "red";
      if (percent > 75) return "yellow";
      return "green";
    };
    const cpu = os.loadavg()[0];
    const memory = ((os.totalmem() - os.freemem()) / os.totalmem()) * 100;
    try {
      donut.setData([
        {
          percent: cpu,
          label: "CPU",
          color: getColor(cpu)
        },
        {
          percent: memory,
          label: "RAM",
          color: getColor(memory)
        }
      ]);
      donut.render();
      donut.screen.render();
    } catch {}
  };
  render();
  donut.on("hide", () => clearInterval(renderInterval));
  const renderInterval = setInterval(render, 1000);
};
