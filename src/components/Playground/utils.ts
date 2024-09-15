import { Route } from "@/app/routes";
import { encodeBase64 } from "@/utils/base64";
import {
  createParamsFromNextSearchParams,
  createSearchParamsURLFromParams,
} from "@/utils/paramsUtils";
import { READ_ONLY_HEADERS } from "@/constants/readOnlyHeaders";
import { PlaygroundURLState } from "@/components/Playground/types";
import { EMPTY_ENDPOINT_TAG } from "@/constants/emptyEndpointTag";

function encodePlaygroundState(state: PlaygroundURLState): string {
  const { endpoint, variables, query } = state;
  const encodedEndpoint = encodeBase64(endpoint || EMPTY_ENDPOINT_TAG);

  const body = JSON.stringify({ query, variables });

  const encodedBody = encodeBase64(body);
  return `${encodedEndpoint}/${encodedBody}`;
}

export function createPlaygroundURL(state: PlaygroundURLState) {
  return encodeURI(
    `${Route.GraphQL}/${encodePlaygroundState(state)}${createSearchParamsURLFromParams(state.headers)}`,
  );
}

export function createGraphqlBodyOfRequest(query: string, variables?: string) {
  if (!variables) {
    return JSON.stringify({ query });
  }
  const parsedVariables = JSON.parse(variables);
  return JSON.stringify({ query, variables: parsedVariables });
}

export function createPlaygroundHeaders(searchParams?: {
  [key: string]: string | undefined;
}) {
  if (!searchParams) return [READ_ONLY_HEADERS.json];
  let headers = createParamsFromNextSearchParams(searchParams);

  if (
    headers.length === 0 ||
    (headers[0].key !== READ_ONLY_HEADERS.json.key &&
      headers[0].value !== READ_ONLY_HEADERS.json.value)
  ) {
    headers = [READ_ONLY_HEADERS.json, ...headers];
  }
  return headers;
}

export function createEndpointSdl(endpoint: string) {
  return `${endpoint}?sdl`;
}
