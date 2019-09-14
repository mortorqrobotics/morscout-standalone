import express from "express";
import request from "supertest";
import { setup, teardown } from "setup/mongoose";

import { Regional, Match } from "models";

import Matches from "../Matches";

let router: express.Router;

beforeAll(setup);
afterAll(teardown);

beforeEach(async () => {
  router = express.Router();
  jest.spyOn(router, "get");
  Matches(router);
});

test("matches has the same routes", async () => {
  expect(
    (router.get as jest.Mock).mock.calls.map(val => val[0]).sort()
  ).toMatchSnapshot();
});

test("get matches by regional works", async () => {
  const regional = await Regional.findOne();
  const response = await request(router).get(`/matches/${regional._id}`);
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});

test("get matches by id works", async () => {
  const regional = await Match.findOne();
  const response = await request(router).get(`/match/${regional._id}`);
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});
