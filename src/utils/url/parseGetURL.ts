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
  const [endpoint, searchParamsURL] = fullEndpoint.split("?");

  const paramsSearchParams = createParamsFromSearchParamsURL(searchParamsURL);

  return {
    method: "GET",
    endpoint,
    searchParams: paramsSearchParams,
    headers,
    postBody: emptyPostBody,
  };
}
