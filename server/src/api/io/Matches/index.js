import { updated, loadAllMatches } from "Shared/types/Matches";
import getMatches from "./getAllMatches";

export default socket => {
  socket.on(loadAllMatches, async () => {
    socket.emit("action", {
      type: updated,
      data: await getMatches(socket)
    });
  });
};
