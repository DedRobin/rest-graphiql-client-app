import RestfullClient from "@/app/(main)/GET/client";
import { emptyPostmanPostUrlState } from "@/constants/postmanEmptyState";
import { PostBody, PostmanURLState } from "@/components/Postman/types";
import { createParamsFromUrlSearchParams } from "@/utils/paramsUtils";
import { decodeBase64 } from "@/utils/base64";
import { addReadOnlyHeader } from "@/components/Postman/utils";

export default function PostPage({
  params: { slug },
  searchParams,
}: {
  params: { slug: string[] };
  searchParams?: { [key: string]: string | undefined };
}) {
  function parseURL(): PostmanURLState {
    const [endpoint, body] = slug.map(decodeBase64);

    if (!endpoint) {
      return emptyPostmanPostUrlState;
    }

    const postBody: PostBody = JSON.parse(body);

    const headers = searchParams
      ? createParamsFromUrlSearchParams(searchParams)
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

  const urlState = parseURL();

  return <RestfullClient urlState={urlState} />;
}
