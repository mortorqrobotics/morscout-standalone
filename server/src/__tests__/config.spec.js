import { join } from "path";
import { writeFileSync, unlinkSync } from "fs";
import { stringify } from "yaml";
import config, { loadConfig } from "../config";

test("Configuration loads", () => {
  expect(config()).resolves.toBeInstanceOf(Object);
});

test("Configuration Loader works", async () => {
  const data = {
    hi: "Hi"
  };
  writeFileSync(join(__dirname, "config.yml"), stringify(data));
  expect(await loadConfig(join(__dirname, "config.yml"))).toMatchObject(data);
});

test("Configuration Loader throws error on nonexistant file", async () => {
  await expect(
    loadConfig(join(__dirname, "nonexistant.yml"))
  ).rejects.toThrow();
});

test("Configuration Loader throws error on erronious yaml file", async () => {
  await expect(loadConfig(join(__dirname, "error.yml"))).rejects.toThrow();
});

afterAll(() => {
  unlinkSync(join(__dirname, "config.yml"));
});
