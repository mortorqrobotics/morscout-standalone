import { updated, loadAllMatches, loadMatch } from "shared/types/matches";
import getMatches from "api/matches/getMatches";
import getMatch from "api/matches/getMatch";
import { Schema } from "mongoose";
import { Socket } from "socket.io";

export default (socket: Socket) => {
  socket.on(loadAllMatches, async (regionalId: string) => {
    socket.emit("action", {
      type: updated,
      data: await getMatches(regionalId)
    });
  });
  socket.on(loadMatch, async (id: string) => {
    socket.emit("action", {
      type: updated,
      data: {
        [id.toString()]: await getMatch(id)
      }
    });
  });
};
