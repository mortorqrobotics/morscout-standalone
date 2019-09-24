import { updated, loadTeams, loadTeam } from "shared/types/teams";
import { Schema } from "mongoose";
import { Socket } from "socket.io";
import getTeams from "api/teams/getTeams";
import getTeam from "api/teams/getTeam";

export default (socket: Socket) => {
  socket.on(loadTeams, async () => {
    socket.emit("action", {
      type: updated,
      data: await getTeams(socket)
    });
  });
  socket.on(loadTeam, async (id: string) => {
    socket.emit("action", {
      type: updated,
      data: {
        [id.toString()]: await getTeam(id)
      }
    });
  });
};
