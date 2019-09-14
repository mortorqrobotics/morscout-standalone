import { setup, teardown } from "setup/mongoose";
import Teams from "../Teams";
import express from "express";
import request from "supertest";
import { User, Team } from "models";

beforeAll(setup);
afterAll(teardown);

let router: express.Router;

beforeEach(() => {
  router = express.Router();
  jest.spyOn(router, "get");
  Teams(router);
});

test("teams has the same routes", async () => {
  expect(
    (router.get as jest.Mock).mock.calls.map(val => val[0]).sort()
  ).toMatchSnapshot();
});

test("get teams by user works", async () => {
  const user = await User.findOne();
  const req = await request(router).get(`/teams/${user._id}`);
  expect(req.status).toBe(200);
  expect(req.text).toMatchSnapshot();
});

test("get team by id works", async () => {
  const team = await Team.findOne();
  const req = await request(router).get(`/team/${team._id}`);
  expect(req.status).toBe(200);
  expect(JSON.parse(req.text)).toMatchSnapshot({
    _id: expect.any(String),
    location: {
      _id: expect.any(String)
    }
  });
});
