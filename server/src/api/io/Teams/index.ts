import { updated, loadTeams, loadTeam } from "Shared/types/Teams";
import { Schema } from "mongoose";
import { Socket } from "socket.io";
import getTeams from "./getTeams";
import getTeam from "./getTeam";

export default (socket: Socket) => {
  socket.on(loadTeams, async () => {
    socket.emit("action", {
      type: updated,
      data: await getTeams(socket)
    });
  });
  socket.on(loadTeam, async (id: Schema.Types.ObjectId) => {
    socket.emit("action", {
      type: updated,
      data: {
        [id.toString()]: await getTeam(id)
      }
    });
  });
};
