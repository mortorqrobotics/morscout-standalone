import { updated } from "shared/types/matches";
import { recursive } from "merge";
import Match from "shared/schemas/match";
import mongoose from "mongoose/browser";

export default (state = {}, action) => {
  const matches = Object.assign({}, state);
  switch (action.type) {
    case updated:
      action.data.forEach(match => {
        let doc = new mongoose.Document({}, Match);
        Object.entries(recursive(matches[match._id], match)).forEach(
          ([name, value]) => {
            doc[name] = value;
          }
        );
        matches[doc._id] = doc;
      });
      return matches;
    default:
      return state;
  }
};
