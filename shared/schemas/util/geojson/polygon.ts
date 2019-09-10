import { Schema, Document } from "mongoose";
import { Polygon } from "geojson";
import { isPolygonCoor } from "geojson-validation";

export default new Schema({
  type: {
    type: String,
    enum: ["Polygon"],
    required: true,
    default: "Polygon"
  },
  coordinates: {
    type: [[[Number]]],
    validate: isPolygonCoor,
    required: true
  }
});

export interface IPolygon extends Document, Polygon {}
