import { loggedin, loggedout } from "shared/types/Basic/LogIn";
import { send } from "./util";
import Matches from "./Matches";

export default sock => {
  // console.log(socket);
  const socket = sock;
  Matches(socket);
  socket.on("getTeams", async () => await socket.User);
  socket.on("LOGIN", ({ username /* , password */ }) => {
    socket.user = {
      username,
      name: "Elias Schablowski"
    };
    send(loggedin, socket.user);
  });
  socket.on("LOGOUT", () => {
    socket.user = {};
    send(loggedout);
  });
};
