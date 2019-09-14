import express from "express";
import Matches from "./Matches";
import Teams from "./Teams";
import Misc from "./Misc";
import config from "config";

const router = express.Router();
router.use((req, res, next) => {
  config.logger.debug(req);
  next();
});
Matches(router);
Teams(router);
Misc(router);
router.get("/", (req, res) => {
  res.end("0.0.1");
});
config.logger.info("Finished setting up HTTP API");

export default router;
