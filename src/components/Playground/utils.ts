import { createBodyOfRequest } from "@/services/requests/utils/createBodyOfRequest";
import { Route } from "@/app/routes";
import { encodeBase64 } from "@/utils/base64";
import { createSearchParamsURLFromParams } from "@/utils/paramsUtils";
import { PlaygroundState } from "@/components/Playground/usePlayground";

function encodePlaygroundSettings(state: PlaygroundState): string {
  const { endpoint, variables, query } = state;

  const encodedEndpoint = encodeBase64(endpoint);

  const body = createBodyOfRequest(query, variables);

  const encodedBody = encodeBase64(body);
  return `${encodedEndpoint}/${encodedBody}`;
}

export function createPlaygroundURL(state: PlaygroundState) {
  return `${Route.GraphQL}/${encodePlaygroundSettings(state)}${createSearchParamsURLFromParams(state.headers)}`;
}
