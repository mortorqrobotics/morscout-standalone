import Matches from "./Matches";
import Teams from "./Teams";
import Accounts from "./Accounts";

export default sock => {
  let socket = sock;
  Accounts(socket);
  Matches(socket);
  Teams(socket);
};
