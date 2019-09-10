import { Schema, Document } from "mongoose";
import { isMultiLineStringCoor } from "geojson-validation";
import { MultiLineString } from "geojson";

export default new Schema({
  type: {
    type: String,
    enum: ["MultiLineString"],
    required: true,
    default: "MultiLineString"
  },
  coordinates: {
    type: [[[Number]]],
    validate: isMultiLineStringCoor,
    required: true
  }
});

export interface IMultiLine extends Document, MultiLineString {}
