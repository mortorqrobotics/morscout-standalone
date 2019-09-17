import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import getData from "./getData";

let mongoServer: MongoMemoryServer;
export async function setup() {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  (process as any).mongoUri = mongoUri;
  await mongoose.connect(
    mongoUri,
    { useNewUrlParser: true, useCreateIndex: true },
    err => {
      if (err) console.error(err);
    }
  );
  await getData();
  return mongoUri;
}

export async function teardown() {
  mongoServer.stop();
}
