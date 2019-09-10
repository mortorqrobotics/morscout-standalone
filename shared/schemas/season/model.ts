import { Schema } from "mongoose";
import ISeason from "./interface";

export default new Schema<ISeason>({
  year: {
    type: Number,
    validate: year => year >= 1989 && year <= new Date().getUTCFullYear() + 1,
    default: () => new Date().getUTCFullYear(),
    required: true
  },
  name: {
    type: String,
    required: true
  },

  buildStart: {
    type: Date,
    required: true
  },
  buildEnd: {
    type: Date,
    required: true
  },
  seasonStart: {
    type: Date,
    required: true
  },
  seasonEnd: {
    type: Date,
    required: true
  }
});
