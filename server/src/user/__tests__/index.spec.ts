jest.doMock("redis");
import redis from "redis";
import { User } from "models";
const redisClient = redis.createClient();
jest.mock("config", () => ({ clients: { redis: redisClient } }));

import { genToken, getUser, delToken } from "..";

beforeEach(() => {
  redisClient.flushall();
});

test("genToken works", async () => {
  jest.mock("crypto");
  const user = new User();
  const token = genToken(user);
  expect(redisClient.set).toHaveBeenCalledWith(
    expect.any(String),
    user._id,
    "EX",
    3600
  );
  expect(token).toEqual(expect.any(String));
});

test("genToken generates a new token every time", async () => {
  jest.mock("crypto");
  const user = new User();
  const token = genToken(user);
  jest.requireMock("crypto").__clearChances__();
  expect(genToken(user)).not.toEqual(token);
});

test("delToken deletes the token", async () => {
  const user = new User();
  const token = genToken(user);
  expect(redisClient.set).toHaveBeenCalledWith(
    expect.any(String),
    user._id,
    "EX",
    3600
  );
  delToken(token);
  await expect(getUser(token)).rejects.toBeInstanceOf(Error);
  expect(redisClient.del).toHaveBeenCalledWith(token, expect.any(Function));
});

test("stores all data correctly", async () => {
  const user = new User();
  const token = genToken(user);
  expect(redisClient.set).toHaveBeenCalledWith(
    expect.any(String),
    user._id,
    "EX",
    3600
  );
  const userSave = await getUser(token);
  expect(redisClient.get).toHaveBeenCalledWith(token, expect.any(Function));
  expect(userSave).toEqual(user._id.toString());
});
