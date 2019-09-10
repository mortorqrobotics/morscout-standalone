import { Document } from "mongoose";
import ISeason from "../season/interface";
import { IPoint } from "../util/geojson/Point";
import { IPolygon } from "../util/geojson/Polygon";

export enum eventTypes {
  regional = "regional",
  district = "district",
  districtCompetition = "districtCompetition",
  championshipDivision = "championshipDivision",
  championshipFinals = "championshipFinals",
  disitrictCompetitionDivision = "disitrictCompetitionDivision",
  festivalOfChampions = "festivalOfChampions",
  offseason = "offseason",
  preseason = "preseason",
  unlabeled = "unlabeled"
}

export default interface IRegional extends Document {
  name: string;
  location: IPoint;
  district: IPolygon;
  url: string;
  eventType: eventTypes;
  startDate: Date;
  endDate: Date;
  season: ISeason["_id"];
  key: string;
}
