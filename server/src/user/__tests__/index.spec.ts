const redis = {
  set: jest.fn((token: string, data: any) => {
    redisStore[token] = data;
  }),
  get: jest.fn((token: string) => {
    return redisStore[token];
  })
};
let redisStore = {};
jest.mock("config", () => ({ clients: { redis } }));

import { genToken, getUser } from "..";

test("genToken and getUser", () => {
  const token = genToken({ _id: "0370bt7" });
  expect(redis.set).toHaveBeenCalledWith(expect.any(String), "0370bt7");
  const user = getUser(token);
  expect(redis.get).toHaveBeenCalledWith(token);
  expect(user).toEqual("0370bt7");
});
