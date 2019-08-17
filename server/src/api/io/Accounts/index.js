import {
  login,
  loggedin,
  logout,
  loggedout,
  anonymous
} from "Shared/types/Basic/LogIn";
import { getUserLoggin, logoutUser } from "./user";

export default socket => {
  socket.user = anonymous;
  socket.on(login, async loginfo => {
    const { username, password, token } = loginfo;
    const info = getUserLoggin(token, username, password);
    socket.user = user;
    socket.token = info.token;
    socket.emit("action", {
      type: loggedin,
      data: info
    });
  });
  socket.on(logout, async () => {
    socket.user = anonymous;
    const error = logoutUser(socket.token);
    socket.emit("action", {
      type: loggedout,
      error
    });
  });
};
