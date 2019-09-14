import getTeams from "api/Teams/getTeams";
import getTeam from "api/Teams/getTeam";
import { Router, Request, Response } from "express";

export default (router: Router) => {
  router.get("/teams/:season", async (req: Request, res: Response) => {
    res.end(JSON.stringify(await getTeams(req.params.season)));
  });
  router.get("/team/:team", async (req: Request, res: Response) => {
    res.end(JSON.stringify(await getTeam(req.params.team)));
  });
};
