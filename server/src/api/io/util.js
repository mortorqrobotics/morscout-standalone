export const send = (type, data) =>
  this.emit("action", {
    type,
    data
  });
