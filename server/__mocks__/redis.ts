import redisMock, { ClientOpts, RedisClient } from "redis-mock";

let clients: Map<ClientOpts, RedisClient> = new Map();

const mockedRedis = {
  createClient: (opts: ClientOpts) => {
    if (clients.has(opts)) return clients.get(opts);
    const client = redisMock.createClient(opts);
    jest.spyOn(client, "get");
    jest.spyOn(client, "set");
    jest.spyOn(client, "del");
    jest.spyOn(client, "exists");
    return client;
  },
  getClients: () => clients
};

module.exports = Object.assign({}, redisMock, mockedRedis);
