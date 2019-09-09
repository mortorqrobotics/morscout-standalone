import Matches from "./Matches";
import Teams from "./Teams";
import Accounts from "./Accounts";
import config from "config";
import { Socket } from "socket.io";

export default (sock: Socket) => {
  let socket = sock;
  Accounts(socket);
  Matches(socket);
  Teams(socket);
  config.logger.info("Finished setting up Socket.io");
};
