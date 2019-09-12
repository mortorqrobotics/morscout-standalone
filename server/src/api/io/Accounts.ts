import {
  login,
  loggedin,
  logout,
  loggedout,
  anonymous,
  loginError
} from "shared/types/basic/logIn";
import { getUserLoggin, logoutUser } from "api/accounts";
import getTeam from "api/teams/getTeam";

export default socket => {
  socket.user = anonymous;
  socket.on(login, async loginfo => {
    const { username, password, token } = loginfo;
    try {
      const user = await getUserLoggin(token, username, password);
      socket.user = user;
      socket.token = user.token;
      socket.team = getTeam(user.team);
      socket.emit("action", {
        type: loggedin,
        data: {
          user,
          team: socket.team
        }
      });
    } catch {
      socket.emit({
        type: loginError
      });
    }
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
