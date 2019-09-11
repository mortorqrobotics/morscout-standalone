import { updated, loadTeams, loadTeam } from "shared/types/Teams";
import { Schema } from "mongoose";
import { Socket } from "socket.io";
import getTeams from "api/Teams/getTeams";
import getTeam from "api/Teams/getTeam";

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
