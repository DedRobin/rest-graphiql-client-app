import { PostmanURLState } from "@/components/Postman/types";
import { decodeBase64 } from "@/utils/base64";
import {
  emptyPostBody,
  emptyPostmanGetUrlState,
} from "@/constants/postmanEmptyState";
import {
  createParamsFromNextSearchParams,
  createParamsFromSearchParamsURL,
} from "@/utils/paramsUtils";
import { EMPTY_ENDPOINT_TAG } from "@/constants/emptyEndpointTag";

export function parseGetURL(
  slug: string[],
  searchParams?: { [p: string]: string | undefined },
): PostmanURLState {
  const [encodedFullEndpoint] = slug;

  if (!encodedFullEndpoint) {
    return emptyPostmanGetUrlState;
  }

  const headers = searchParams
    ? createParamsFromNextSearchParams(searchParams)
    : [];

  const fullEndpoint = decodeBase64(encodedFullEndpoint);
  const [endpointOrEmptyTag, searchParamsURL] = fullEndpoint.split("?");
  const endpoint =
    endpointOrEmptyTag === EMPTY_ENDPOINT_TAG ? "" : endpointOrEmptyTag;

  const paramsSearchParams = createParamsFromSearchParamsURL(searchParamsURL);

  return {
    method: "GET",
    endpoint,
    searchParams: paramsSearchParams,
    headers,
    postBody: emptyPostBody,
  };
}
