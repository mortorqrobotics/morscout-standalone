import Matches from "./Matches";
import Accounts from "./Accounts";

export default sock => {
  let socket = sock;
  Accounts(socket);
  Matches(socket);
  socket.on("server/getTeams", async () => await socket.User);
};
