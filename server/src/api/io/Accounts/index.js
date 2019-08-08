import {
  login,
  loggedin,
  logout,
  loggedout,
  invalidCredentials
} from "Shared/types/Basic/LogIn";
import { getUserLoggin, logoutUser } from "./user";

export default socket => {
  socket.user = {
    username: "anonymous"
  };
  socket.on(login, async loginfo => {
    if (
      typeof loginfo !== "object" &&
      typeof loginfo.username !== "string" &&
      typeof loginfo.password !== "string"
    ) {
      socket.emit("action", {
        type: invalidCredentials
      });
      return;
    }
    const { username, password } = loginfo;
    try {
      const { user, token } = getUserLoggin(username, password);
      socket.user = user;
      socket.token = token;
      socket.emit("action", {
        type: loggedin,
        data: {
          ...user,
          token
        }
      });
    } catch (error) {
      socket.emit("action", {
        type: invalidCredentials,
        data: error
      });
      return;
    }
  });
  socket.on(logout, async () => {
    try {
      logoutUser(socket.token);
      socket.emit("action", {
        type: loggedout
      });
    } catch (error) {
      socket.emit("action", {
        type: loggedout,
        error
      });
    }
  });
};
