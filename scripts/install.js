const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

fs.symlinkSync(
  path.join(root, "app"),
  path.join(root, "node_modules", "morscout-web"),
);
fs.symlinkSync(
  path.join(root, "server"),
  path.join(root, "node_modules", "morscout-server"),
);
