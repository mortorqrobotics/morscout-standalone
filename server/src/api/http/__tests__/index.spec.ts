import request from "supertest";
import { setup, teardown } from "setup/mongoose";
import configEmitter from "config";

import router from "../index";

beforeAll(setup);
afterAll(teardown);

test("http has the same routes", async () => {
  expect(router.stack).toMatchSnapshot();
});

test("logs debug message when it gets a route", async () => {
  jest.spyOn(configEmitter.logger, "debug");
  await request(router).get("/");
  expect(configEmitter.logger.debug).toHaveBeenCalled();
});

// test("")
