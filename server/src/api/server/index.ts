import express from "express";
import Matches from "./Matches";
import Teams from "./Teams";
import Misc from "./Misc";
import config from "config";

export default () => {
  const router = express.Router();
  router.use((req, res, next) => {
    config.logger.debug(req);
    next();
  });
  router.use(Matches);
  router.use(Teams);
  router.use(Misc);
  config.logger.info("Finished setting up HTTP API");
  return router;
};
