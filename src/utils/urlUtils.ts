import { decode, encode } from "js-base64";
import { Route } from "@/app/routes";

import { createBodyOfRequest } from "@/services/requests/utils/createBodyOfRequest";
import { PlaygroundSettings } from "@/components/Playground/types";

function encodeBase64(str: string) {
  return encode(str).replace(/=/g, "");
}

export function decodeBase64(str: string) {
  const padding = "=".repeat((4 - (str.length % 4)) % 4);
  return decode(str + padding);
}

function encodePlaygroundSettings(settings: PlaygroundSettings): string {
  const { endpoint, variables, query } = settings;

  const encodedEndpoint = encodeBase64(endpoint);

  const body = createBodyOfRequest(query, variables);

  const encodedBody = encodeBase64(body);
  return `${encodedEndpoint}/${encodedBody}`;
}

function createParamsTailURL(searchParams: URLSearchParams): string {
  if (!searchParams || searchParams.size === 0) {
    return "";
  }
  return `?${searchParams.toString()}`;
}

export function createPlaygroundURL(settings: PlaygroundSettings) {
  return `${Route.GraphQL}/${encodePlaygroundSettings(settings)}${createParamsTailURL(settings.headers)}`;
}

export function updateUrlInBrowser(url: string) {
  window.history.pushState({}, "", url);
}
