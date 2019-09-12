jest.doMock("fs");
import args from "../args";
jest.requireMock("fs").__setMockFiles({
  [args.config]: `
  logLevel: error
  mongo:
    url: localhost:123`
});
import configEmitter from "..";
import { EventEmitter } from "events";

test("configEmitter is an EventEmitter", async () => {
  expect(configEmitter).toBeInstanceOf(EventEmitter);
});
