import { Schema } from "mongoose";
import { pointSchema, polygonSchema } from "../util/geojson";
import IRegional from "./interface";

const RegionalSchema: Schema<IRegional> = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: pointSchema,
    required: true
  },
  district: polygonSchema,
  url: {
    type: String,
    validate: url => encodeURI(url) === url,
    required: true
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
    ],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  season: {
    type: Schema.Types.ObjectId,
    ref: "Season",
    required: true
  },
  key: {
    type: String,
    required: true,
    unique: true,
    index: true
  }
});

export default RegionalSchema;
