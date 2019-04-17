import { updated as updatedMatches } from "shared/types/Matches";
import { send } from "../util";
import getMatches from "./getMatches";

export default socket => {
  socket.on(
    "getMatches",
    send(updatedMatches, getMatches(socket)).bind(socket)
  );
};
