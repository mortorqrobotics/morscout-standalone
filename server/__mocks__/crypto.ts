import Chance from "chance";
import * as stream from "stream";

const chances = {};

const mockCrypto = jest.genMockFromModule("crypto") as crypto;
mockCrypto.randomBytes = (size, seed = 42, callback) => {
  if (typeof seed === "function") {
    callback = seed;
    seed = 42;
  }
  //eslint-disable-next-line security/detect-object-injection
  chances[seed] = chances[seed] || new Chance(seed);
  //eslint-disable-next-line security/detect-object-injection
  const chance = chances[seed];

  const randomByteArray = chance.n(chance.natural, size, { max: 255 });
  const buffer = Buffer.from(randomByteArray);

  if (typeof callback === "function") {
    callback(null, buffer);
  }
  return buffer;
};

mockCrypto.__clearChances__ = () => {
  Object.keys(chances).forEach(key => {
    // eslint-disable-next-line security/detect-object-injection
    delete chances[key];
  });
};

module.exports = mockCrypto;

interface crypto {
  randomBytes: (
    size: number,
    seed?: number,
    callback?: (error: Error, buffer: Buffer) => void
  ) => Buffer;
  __clearChances__: () => void;
}
