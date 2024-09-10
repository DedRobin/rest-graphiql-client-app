import { PlaygroundSettings } from "@/components/Playground/types";
import { createBodyOfRequest } from "@/services/requests/utils/createBodyOfRequest";
import { Route } from "@/app/routes";
import { encodeBase64 } from "@/utils/base64";
import { createSearchParamsURLFromParams } from "@/utils/paramsUtils";

function encodePlaygroundSettings(settings: PlaygroundSettings): string {
  const { endpoint, variables, query } = settings;

  const encodedEndpoint = encodeBase64(endpoint);

  const body = createBodyOfRequest(query, variables);

  const encodedBody = encodeBase64(body);
  return `${encodedEndpoint}/${encodedBody}`;
}

export function createPlaygroundURL(settings: PlaygroundSettings) {
  return `${Route.GraphQL}/${encodePlaygroundSettings(settings)}${createSearchParamsURLFromParams(settings.headers)}`;
}
