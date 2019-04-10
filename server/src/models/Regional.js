import { Schema } from "mongoose";
import { pointSchema, polygonSchema } from "./util/GeoJSON";
import { eventTypes } from "./util/TBA";

export default mongoose => {
  const RegionalSchema = new Schema({
    name: String,
    location: pointSchema,
    district: polygonSchema,
    url: {
      type: String,
      validate: url => encodeURI(url) === url
    },
    eventType: {
      type: Number,
      validate: type => Object.keys(eventTypes).includes(type)
    },
    startDate: {
      type: Date
    },
    endData: {
      type: Date,
      validate: date => this.startDate.time() < date.time()
    },
    season: {
      type: Schema.types.ObjectId,
      ref: "Season"
    }
  });

  return mongoose.model("Regional", RegionalSchema);
};
