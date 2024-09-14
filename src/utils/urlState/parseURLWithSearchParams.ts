import { PostmanURLState } from "@/components/Postman/types";
import { decodeBase64 } from "@/utils/base64";
import { emptyPostBody } from "@/constants/postmanEmptyState";
import {
  createParamsFromNextSearchParams,
  createParamsFromSearchParamsURL,
} from "@/utils/paramsUtils";
import { EMPTY_ENDPOINT_TAG } from "@/constants/emptyEndpointTag";
import { HttpMethod } from "@/types/Method";
import { createEmptyPostmanUrlStateWithSearchParams } from "@/utils/urlState/asdf";

export function parseURLWithSearchParams(
  method: HttpMethod,
  slug: string[],
  searchParams?: { [p: string]: string | undefined },
): PostmanURLState {
  const [encodedFullEndpoint] = slug;

  if (!encodedFullEndpoint) {
    return createEmptyPostmanUrlStateWithSearchParams(method);
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
    method,
    endpoint,
    searchParams: paramsSearchParams,
    headers,
    postBody: emptyPostBody,
  };
}
