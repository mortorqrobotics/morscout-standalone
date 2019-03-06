import { updated as updatedMatches } from "shared/types/Matches";
import { updated as updatedTeams } from "shared/types/Teams";
import { loggedin } from "shared/types/Basic/LogIn";

export default sock => {
  // console.log(socket);
  const socket = sock;
  const send = () => (type, data) => socket.emit("action", {
    type,
    data
  });
  socket.on("getMatches", () => send(updatedMatches,
      {
        "1": {
          time: "2017-12-17T17:00:00.000Z",
          teams: {
            blue: [
              {
                num: 1515
              },
              {
                num: 1928
              },
              {
                num: 1385
              }
            ],
            red: [
              {
                num: 999
              },
              {
                num: 666
              },
              {
                num: 333
              }
            ]
          },
          progress: { current: 3, max: 6 }
        }
      }
    ));
  socket.on("getTeams", () => send(updatedTeams,
      {
        "1515": {
          matches: ["1"],
          name: "MorTorq"
        }
      }
    ));
  socket.on("LOGIN", ({ username /* , password */ }) => {
    socket.user = {
      username,
      name: "Elias Schablowski"
    };
    send(loggedin, socket.user);
  });
};
