import mongoose from "mongoose";

module.exports = () => {
  mongoose.disconnect();
  (mongoose as any).server.stop();
};
