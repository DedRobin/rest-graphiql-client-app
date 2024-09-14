import { PostBody, PostmanURLState } from "@/components/Postman/types";
import { decodeBase64 } from "@/utils/base64";
import { emptyPostmanPostUrlState } from "@/constants/postmanEmptyState";
import { createParamsFromNextSearchParams } from "@/utils/paramsUtils";
import { addReadOnlyHeader } from "@/components/Postman/utils";
import { EMPTY_ENDPOINT_TAG } from "@/constants/emptyEndpointTag";

export function parsePostURL(
  slug: string[],
  searchParams?: { [p: string]: string | undefined },
): PostmanURLState {
  const [endpointOrEmptyTag, body] = slug.map(decodeBase64);

  if (!endpointOrEmptyTag) {
    return emptyPostmanPostUrlState;
  }
  console.log(endpointOrEmptyTag);
  const endpoint =
    endpointOrEmptyTag === EMPTY_ENDPOINT_TAG ? "" : endpointOrEmptyTag;

  const postBody: PostBody = JSON.parse(body);

  const headers = searchParams
    ? createParamsFromNextSearchParams(searchParams)
    : [];

  const allHeaders = addReadOnlyHeader(headers, postBody.type);

  return {
    method: "POST",
    endpoint,
    searchParams: [],
    headers: allHeaders,
    postBody,
  };
}
