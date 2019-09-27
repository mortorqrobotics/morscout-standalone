// __tests__/index.spec.js
import { updated } from "shared/types/teams";
import { parse } from "yaml";
import { readFile } from "fs-extra";
import { join } from "path";
import reducer from "..";

test("reducer must never mutate the state directly", async () => {
  expect.assertions(2);
  const teams = {};
  const a = Object.assign({}, teams);
  const res = reducer(teams, {});
  expect(res).toBe(teams);
  expect(res).toEqual(a);
});

test("reducer returns the same as before (for compatibility)", async () => {
  const teams = {};
  const data = parse(await readFile(join(__dirname, "index.data.yml")));
  expect.assertions(data.length);
  data.forEach(d => {
    const ret = reducer(teams, { type: updated, data: d });
    expect(ret).toMatchSnapshot();
  });
});

test("reducer must not initialize the same thing and not with undefined", async () => {
  expect.assertions(2);
  const init = reducer(undefined, {});
  expect(init).not.toBe(undefined);
  expect(init).toMatchSnapshot();
});
