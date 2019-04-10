import { Schema } from "mongoose";

export default mongoose => {
  const SeasonSchema = new Schema({
    year: {
      type: Number,
      validate: year => year >= 1989 && year <= Date.now().getUTCFullYear() + 1,
      default: Date.now
    },
    name: String,
    buildStart: {
      type: Date,
      validate: date =>
        date.getUTCFullYear() === this.year ||
        date.getUTCFullYear() === this.year - 1
    },
    buildEnd: {
      type: Date,
      validate: date =>
        (date.getUTCFullYear() === this.year ||
          date.getUTCFullYear() === this.year - 1) &&
        date.time() > this.buildStart.time()
    },
    seasonStart: {
      type: Date,
      validate: date =>
        date.getUTCFullYear() === this.year &&
        date.time() > this.buildEnd.time()
    },
    seasonEnd: {
      type: Date,
      validate: date => date.time() > this.seasonStart.time()
    }
  });

  return mongoose.model("Season", SeasonSchema);
};
