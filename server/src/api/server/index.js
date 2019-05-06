import express from "express";
import { Team } from "models";

export default ({ mongoose }) => {
  const app = express.Router();
  app.get("/teams", async (req, res) => {
    res.send(JSON.stringify(Team.getList()));
  });
  app.get("/team/:id", async (req, res) => {
    res.send();
  });
  return app;
};
