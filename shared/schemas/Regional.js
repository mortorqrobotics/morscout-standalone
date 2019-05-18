import { Schema } from "mongoose";
import { pointSchema, polygonSchema } from "./util/GeoJSON";

const RegionalSchema = new Schema({
  name: String,
  location: pointSchema,
  district: polygonSchema,
  url: {
    type: String,
    validate: url => encodeURI(url) === url
  },
  eventType: {
    type: String,
    enum: [
      "regional",
      "district",
      "districtCompetition",
      "championshipDivision",
      "championshipFinals",
      "disitrictCompetitionDivision",
      "festivalOfChampions",
      "offseason",
      "preseason",
      "unlabeled"
    ]
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  season: {
    type: Schema.Types.ObjectId,
    ref: "Season"
  }
});

export default RegionalSchema;
