import RestfullClient from "@/app/(main)/GET/client";
import {
  createParamsFromSearchParamsURL,
  createParamsFromNextSearchParams,
} from "@/utils/paramsUtils";
import { decodeBase64 } from "@/utils/base64";
import { PostmanURLState } from "@/components/Postman/types";
import {
  emptyPostBody,
  emptyPostmanGetUrlState,
} from "@/constants/postmanEmptyState";

export default function GetPage({
  params: { slug },
  searchParams,
}: {
  params: { slug: string[] };
  searchParams?: { [key: string]: string | undefined };
}) {
  function parseURL(): PostmanURLState {
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

  const urlState = parseURL();

  return <RestfullClient urlState={urlState} />;
}
