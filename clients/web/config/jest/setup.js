global.fetch = require("jest-fetch-mock");

const Chance = require("chance");

const chances = {};

const mockMath = Object.create(Math);
mockMath.random = (seed = 42) => {
  chances[seed] = chances[seed] || new Chance(seed);
  const chance = chances[seed];
  return chance.random();
};

global.Math = mockMath;
