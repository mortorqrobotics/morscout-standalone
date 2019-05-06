import { updated, loadAllMatches } from "shared/types/Matches";
import getMatches from "./getAllMatches";

export default socket => {
  socket.on(loadAllMatches, async () => {
    socket.emit("action", {
      type: updated,
      data: await getMatches(socket)
    });
  });
};
