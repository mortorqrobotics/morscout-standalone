import { loadSeason, updatedSeason } from "shared/types/Misc/Season";
import getSeason from "api/Misc/getSeason";
import { Socket } from "socket.io";

export default (socket: Socket) => {
  socket.on(loadSeason, async (year: number) => {
    socket.emit("action", {
      type: updatedSeason,
      data: await getSeason(year)
    });
  });
};
