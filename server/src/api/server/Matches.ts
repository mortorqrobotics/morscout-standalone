import getMatches from "api/Matches/getMatches";
import getMatch from "api/Matches/getMatch";
import { Router, Request, Response } from "express";

export default (router: Router) => {
  router.get("/matches/:season", async (req: Request, res: Response) => {
    res.send(JSON.stringify(await getMatches(req.params.season)));
  });
  router.get("/match/:team", async (req: Request, res: Response) => {
    res.send(JSON.stringify(await getMatch(req.params.team)));
  });
};
