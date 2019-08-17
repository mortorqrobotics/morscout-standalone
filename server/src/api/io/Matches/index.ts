import { updated, loadAllMatches, loadMatch } from "Shared/types/Matches";
import getMatches from "./getMatches";
import getMatch from "./getMatch";
import { Schema } from "mongoose";
import { Socket } from "socket.io";

export default (socket: Socket) => {
  socket.on(loadAllMatches, async () => {
    socket.emit("action", {
      type: updated,
      data: await getMatches(socket)
    });
  });
  socket.on(loadMatch, async (id: Schema.Types.ObjectId) => {
    socket.emit("action", {
      type: updated,
      data: {
        [id.toString()]: await getMatch(id)
      }
    });
  });
};
