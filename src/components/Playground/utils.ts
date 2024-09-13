import { Route } from "@/app/routes";
import { encodeBase64 } from "@/utils/base64";
import {
  createParamsFromUrlSearchParams,
  createSearchParamsURLFromParams,
} from "@/utils/paramsUtils";
import { PlaygroundState } from "@/components/Playground/usePlayground";
import { READ_ONLY_HEADERS } from "@/constants/readOnlyHeaders";

function encodePlaygroundState(state: PlaygroundState): string {
  const { endpoint, variables, query } = state;

  const encodedEndpoint = encodeBase64(endpoint);

  const body = createGraphqlBodyOfRequest(query, variables);

  const encodedBody = encodeBase64(body);
  return `${encodedEndpoint}/${encodedBody}`;
}

export function createPlaygroundURL(state: PlaygroundState) {
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

export function createHeaders(urlSearchParams: URLSearchParams) {
  let headers = createParamsFromUrlSearchParams(urlSearchParams);
  if (
    headers.length === 0 ||
    (headers[0].key !== READ_ONLY_HEADERS.json.key &&
      headers[0].key !== READ_ONLY_HEADERS.json.value)
  ) {
    headers = [READ_ONLY_HEADERS.json, ...headers];
  }
  return headers;
}
