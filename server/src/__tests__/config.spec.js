import { join } from "path";
import { writeFileSync, unlinkSync } from "fs";
import { stringify } from "yaml";
import config, { loadConfig } from "../config";

test("Configuration loader works", () => {
  expect(config()).resolves.toBeInstanceOf(Object);
});

test("Configuration Loader works", async () => {
  const data = {
    hi: "Hi"
  };
  writeFileSync(join(__dirname, "config.yml"), stringify(data));
  expect(loadConfig(join(__dirname, "config.yml"))).resolves.toMatchObject(
    data
  );
});

afterAll(() => {
  unlinkSync(join(__dirname, "config.yml"));
});
