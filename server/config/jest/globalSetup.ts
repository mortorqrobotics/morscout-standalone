import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;
export default async () => {
  mongoServer = new MongoMemoryServer({
    autoStart: false
  });
  await mongoServer.getConnectionString();
  mongoServer.stop();
};
