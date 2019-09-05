import { updated, loadAllMatches, loadMatch } from "Shared/types/Matches";
import getMatches from "api/Matches/getMatches";
import getMatch from "api/Matches/getMatch";
import { Schema } from "mongoose";
import { Socket } from "socket.io";

export default (socket: Socket) => {
  socket.on(loadAllMatches, async (regionalId: string) => {
    socket.emit("action", {
      type: updated,
      data: await getMatches(regionalId)
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
