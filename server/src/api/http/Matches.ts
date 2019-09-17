import getMatches from "api/matches/getMatches";
import getMatch from "api/matches/getMatch";
import { Router, Request, Response } from "express";

export default (router: Router) => {
  router.get("/matches/:regional", async (req: Request, res: Response) => {
    res.end(JSON.stringify(await getMatches(req.params.regional)));
  });
  router.get("/match/:match", async (req: Request, res: Response) => {
    res.end(JSON.stringify(await getMatch(req.params.match)));
  });
};
