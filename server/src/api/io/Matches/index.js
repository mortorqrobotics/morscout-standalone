import { updated as updatedMatches } from "shared/types/Matches";
import { send } from "../util";
import getMatches from "./getMatches";

export default (socket, { mongoose }) => {
  socket.on(
    "getMatches",
    send(updatedMatches, getMatches(socket, { mongoose })).bind(socket)
  );
};
