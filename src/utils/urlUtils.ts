import { PlaygroundSettings } from "@/components/Playground/usePlayground";
import { decode, encode } from "js-base64";
import { Route } from "@/app/routes";

import { createBodyOfRequest } from "@/services/requests/utils/createBodyOfRequest";
import { RedirectType } from "next/navigation";

function encodeBase64(str: string) {
  return encode(str).replace(/=/g, "");
}

function decodeBase64(str: string) {
  const padding = "=".repeat((4 - (str.length % 4)) % 4);
  return decode(str + padding);
}

export function parseSlug(
  slug: string[],
  redirect: (url: string, type?: RedirectType) => void,
) {
  const [endpoint, body] = slug.map(decodeBase64);

  let query = "";
  let variables = "";

  if (body) {
    try {
      const bodyObj = JSON.parse(body);
      query = bodyObj.query ? bodyObj.query : "";
      variables = bodyObj.variables
        ? JSON.stringify(bodyObj.variables, null, 2)
        : "";
    } catch {
      redirect(`${Route.GraphQL}/${encodeBase64(endpoint)}`);
    }
  }

  const settings: PlaygroundSettings = { endpoint, query, variables };

  return settings;
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

export function createPlaygroundURL(
  settings: PlaygroundSettings,
  headers: URLSearchParams,
) {
  return `${Route.GraphQL}/${encodePlaygroundSettings(settings)}${createParamsTailURL(headers)}`;
}
