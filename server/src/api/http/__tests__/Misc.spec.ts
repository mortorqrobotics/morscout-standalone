import { setup, teardown } from "setup/mongoose";
import express from "express";
import Misc from "../Misc";
import request from "supertest";

beforeAll(setup);
afterAll(teardown);

let router: express.Router;

beforeEach(() => {
  router = express.Router();
  jest.spyOn(router, "get");
  Misc(router);
});

test("miscelaneous routes are the same", async () => {
  expect(
    (router.get as jest.Mock).mock.calls.map(val => val[0]).sort()
  ).toMatchSnapshot();
});

test("/season returns the current season", async () => {
  const req = await request(router).get("/season");
  expect(req.status).toBe(200);
  expect(req.text).toMatchSnapshot();
});

test("/season/year returns the correct year", async () => {
  const req = await request(router).get("/season/2015");
  expect(req.status).toBe(200);
  expect(req.text).toMatchSnapshot();
});
