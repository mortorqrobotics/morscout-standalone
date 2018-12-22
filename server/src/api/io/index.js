import { updated } from "shared/types/Matches";

export default socket => {
  // console.log(socket);
  socket.on("getMatches", () => {
    socket.emit("action", {
      type: updated,
      data: {
        "1": {
          time: "2017-12-17T17:00:00.000Z",
          teams: {
            blue: [
              {
                num: 1515,
              },
              {
                num: 1928,
              },
              {
                num: 1385,
              },
            ],
            red: [
              {
                num: 999,
              },
              {
                num: 666,
              },
              {
                num: 333,
              },
            ],
          },
          progress: { current: 3, max: 6 },
        },
      },
    });
  });
};
