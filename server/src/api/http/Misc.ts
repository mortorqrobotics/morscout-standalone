import getSeason from "api/Misc/getSeason";
import { Router, Request, Response } from "express";

export default (router: Router) => {
  router.get("/season", async (req: Request, res: Response) => {
    res.send(JSON.stringify(await getSeason()));
  });
  router.get("/season/:year", async (req: Request, res: Response) => {
    const { yearString } = req.params;
    if (!/[\d]*/.test(yearString)) res.status(400).end("Year must be a number");
    else {
      const year = parseInt(yearString);
      if (year < 2015 || year > new Date().getFullYear())
        res.status(400).end("Year must be between 2015 and now");
      else res.send(JSON.stringify(await getSeason(year)));
    }
  });
};
