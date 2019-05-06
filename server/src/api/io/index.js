import { loggedin, loggedout } from "shared/types/Basic/LogIn";
import { send } from "./util";
import Matches from "./Matches";

export default sock => {
  let socket = sock;
  Matches(socket);
  socket.on("server/getTeams", async () => await socket.User);
  socket.User = {};
  socket.on("LOGIN", ({ username /* , password */ }) => {
    socket.User = {
      username,
      name: "Elias Schablowski"
    };
    send(socket)(loggedin, socket.user);
  });
  socket.on("LOGOUT", () => {
    socket.User = {};
    send(socket)(loggedout);
  });
};
