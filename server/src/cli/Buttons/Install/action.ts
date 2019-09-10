import request from "superagent";
import { Season, Regional } from "models";
import configEmitter from "config";

export default (): void => {
  //   const { tba } = configEmitter.clients;
  //   const thisYear: number = new Date().getFullYear();
  //   const { full, override } = configEmitter.config.install;
  //   if (full) {
  //     for (
  //       let year = 2015; // First year we can get a valid name w/ API
  //       year <= thisYear;
  //       year++
  //     )
  //       installYear(year);
  //   } else {
  //     installYear(thisYear);
  //   }
  //   async function installYear(year: number): Promise<void> {
  //     if (override || (await Season.findOne({ year }))) {
  //       const events = tba.EventApi().getEventsByYear(year);
  //       const firstEvent = events.sort(e => new Date(e.startDate))[0].startDate;
  //       const lastEvent = events.sort(e => new Date(e.endDate))[events.length - 1]
  //         .endDate;
  //       const seasonAPI = JSON.parse(
  //         (await request
  //           .get(
  //             `https://frc-${
  //               configEmitter.config.development ? "staging-" : ""
  //             }api.firstinspires.org/v2.0/${year}`
  //           )
  //           .set("Accept", "application/json")
  //           .set(
  //             "Authorization",
  //             `Basic ${Buffer.from(
  //               `${configEmitter.config.frc.username}:${configEmitter.config.frc.token}`
  //             ).toString("base64")}`
  //           )).text
  //       );
  //       const buildStart = new Date(seasonAPI.kickoff);
  //       const buildEnd = new Date(buildStart.getDate() + 42); // Six Weeks
  //       const season = await Season.create({
  //         year,
  //         name: seasonAPI.gameName as string,
  //         buildStart,
  //         buildEnd,
  //         seasonStart: new Date(firstEvent),
  //         seasonEnd: new Date(lastEvent)
  //       });
  //       season.save();
  //       events.forEach(async ev => {
  //         const event = await Regional.create({
  //           key: ev.key,
  //           name: ev.name,
  //           location: {
  //             type: "Point",
  //             coordinates: [ev.lat, ev.lng]
  //           },
  //           url: ev.website,
  //           eventType: eventNumberToString(ev.eventType),
  //           startDate: new Date(ev.startDate),
  //           endDate: new Date(ev.endDate),
  //           season: season._id
  //         });
  //         event.save();
  //       });
  //     }
  //   }
  // };

  // function eventNumberToString(num: number) {
  //   switch (num) {
  //     case 0:
  //       return "regional";
  //     case 1:
  //       return "district";
  //     case 2:
  //       return "distictCompetition";
  //     case 3:
  //       return "championshipDivision";
  //     case 4:
  //       return "championshipFinals";
  //     case 5:
  //       return "disitrictCompetitionDivision";
  //     case 6:
  //       return "festivalOfChampions";
  //     case 99:
  //       return "offseason";
  //     case 100:
  //       return "preseason";
  //     default:
  //       return "unlabeled";
  //   }
  configEmitter.logger.info("Installing");
};
