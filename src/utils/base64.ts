import { decode, encode } from "js-base64";

export function encodeBase64(str: string) {
  return encode(str).replace(/=/g, "");
}

export function decodeBase64(str: string) {
  const padding = "=".repeat((4 - (str.length % 4)) % 4);
  return decode(str + padding);
}
