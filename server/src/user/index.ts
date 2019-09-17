import { randomBytes } from "crypto";
import base64url from "base64url";
import configEmitter from "config";
import IUser from "shared/schemas/user/interface";

const { redis } = configEmitter.clients;

export function genToken(user: IUser) {
  let token: string;
  do {
    token = base64url(randomBytes(36));
    // eslint-disable-next-line security/detect-non-literal-fs-filename
  } while (redis.exists(token));
  redis.set(token, user._id, "EX", 60 * 60); // Automatically delete token after 1 hour
  return token;
}

export function getUser(token: string): Promise<string> {
  return new Promise((resolve, reject) => {
    redis.get(token, (error, value) => {
      if (error) reject(error);
      else if (value == null) reject(new Error("No Such Token"));
      else resolve(value);
    });
  });
}

export function delToken(token: string) {
  return new Promise((resolve, reject) => {
    redis.del(token, (error, value) => {
      if (error) reject(error);
      else resolve();
    });
  });
}
