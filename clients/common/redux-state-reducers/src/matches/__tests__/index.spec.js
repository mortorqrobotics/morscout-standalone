import { Schema } from "mongoose";
import { updated } from "shared/types/matches";
import { parse } from "yaml";
import { readFile } from "fs-extra";
import { join } from "path";
import reducer from "..";

test("reducer must never mutate the state directly", async () => {
  expect.assertions(2);
  const matches = {};
  const a = Object.assign({}, matches);
  const res = reducer(matches, {});
  expect(res).toBe(matches);
  expect(res).toEqual(a);
});

test("reducer returns the same as before (for compatibility)", async () => {
  const matches = {};
  const data = parse(
    (await readFile(join(__dirname, "index.data.yml"))).toString()
  );
  expect.assertions(data.length);
  data.forEach(d => {
    const ret = reducer(matches, { type: updated, data: d });
    expect(ret).toMatchSnapshot();
  });
});

test("reducer must not initialize the same thing and not with undefined", async () => {
  expect.assertions(2);
  const init = reducer(undefined, {});
  expect(init).not.toBe(undefined);
  expect(init).toMatchSnapshot();
});
