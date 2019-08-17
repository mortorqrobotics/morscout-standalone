import { randomBytes } from "crypto";
import base64url from "base64url";
import configEmitter from "config";

export function genToken(user) {
  let token = base64url(randomBytes(36));
  configEmitter.clients.redis.set(token, user._id);
}

export function getUser(token) {
  return configEmitter.clients.redis.get(token);
}
