import { setup, teardown } from "setup/mongoose";
jest.doMock("fs");
jest.doMock("redis");
jest.doMock("consul");
import args from "../args";
import { EventEmitter } from "events";
import ConfigEmitter from "../ConfigEmitter";

afterAll(async () => {
  // configEmitter.clients.mongoose.disconnect();
  await teardown();
});

beforeAll(async () => {
  jest.requireMock("fs").__setMockFiles({
    [args.config]: `
logLevel: error
mongo:
  url: ${await setup()}
consul:
  use: true
  hostname: googleplex
  port: 1`
  });
});

test("configEmitter is an EventEmitter", async () => {
  jest.useFakeTimers();
  const configEmitter = require("..").default;
  expect(configEmitter).toBeInstanceOf(ConfigEmitter);
  expect(configEmitter).toBeInstanceOf(EventEmitter);
});
