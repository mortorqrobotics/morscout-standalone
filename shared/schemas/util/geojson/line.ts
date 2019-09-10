import { Schema, Document } from "mongoose";
import { isLineStringCoor } from "geojson-validation";
import { LineString } from "geojson";

export default new Schema({
  type: {
    type: String,
    enum: ["LineString"],
    required: true,
    default: "LineString"
  },
  coordinates: {
    type: [[Number]],
    validate: isLineStringCoor,
    required: true
  }
});

export interface ILine extends Document, LineString {}
