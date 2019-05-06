export const send = socket => (type, data) =>
  socket.emit("action", {
    type,
    data
  });
