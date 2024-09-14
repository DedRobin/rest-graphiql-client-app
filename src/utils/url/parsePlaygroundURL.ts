import { PlaygroundURLState } from "@/components/Playground/types";
import { decodeBase64 } from "@/utils/base64";
import {
  createEndpointSdl,
  createPlaygroundHeaders,
} from "@/components/Playground/utils";
import { emptyPlaygroundUrlState } from "@/constants/playgroundEmptyState";
import { EMPTY_ENDPOINT_TAG } from "@/constants/emptyEndpointTag";

export function parsePlaygroundURL(
  slug: string[],
  searchParams?: { [p: string]: string | undefined },
): PlaygroundURLState {
  const [endpointOrEmptyTag, body] = slug.map(decodeBase64);
  const headers = createPlaygroundHeaders(searchParams);

  const endpoint =
    endpointOrEmptyTag === EMPTY_ENDPOINT_TAG ? "" : endpointOrEmptyTag;
  const endpointSdl = createEndpointSdl(endpoint);

  const stateWithoutBody: PlaygroundURLState = {
    ...emptyPlaygroundUrlState,
    endpoint,
    endpointSdl,
    headers,
  };

  if (endpoint === undefined) {
    return emptyPlaygroundUrlState;
  }

  if (!body) {
    return stateWithoutBody;
  }

  let query = "";
  let variables = "";

  try {
    const bodyObj = JSON.parse(body);
    query = bodyObj.query ? bodyObj.query : "";
    variables = bodyObj.variables
      ? JSON.stringify(bodyObj.variables, null, 2)
      : "";
  } catch {
    // redirect(createPlaygroundURL(stateWithoutBody));
    // Проброс может ошибки что в ссылке был плохой объект и мы его удалили

    return stateWithoutBody;
  }
  return { query, endpoint, variables, headers, endpointSdl };
}
