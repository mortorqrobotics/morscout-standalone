import { loadSeason, updatedSeason } from "shared/types/misc/Season";
import getSeason from "api/misc/getSeason";
import { Socket } from "socket.io";

export default (socket: Socket) => {
  socket.on(loadSeason, async (year: number) => {
    socket.emit("action", {
      type: updatedSeason,
      data: await getSeason(year)
    });
  });
};
