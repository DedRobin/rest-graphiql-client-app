import {
  createSearchParamsURLFromParams,
  replaceVariablesInParams,
  replaceVariablesInStr,
} from "@/utils/paramsUtils";
import { encodeBase64 } from "@/utils/base64";
import { Param } from "@/types/Param";
import { READ_ONLY_HEADERS } from "@/constants/readOnlyHeaders";
import { PostmanURLState, TypePostBody } from "@/components/Postman/types";
import { EMPTY_ENDPOINT_TAG } from "@/constants/emptyEndpointTag";
import { isMethodWithBody } from "@/types/Method";

export function createRestfullURL(
  state: PostmanURLState,
  variables: Param[],
): string {
  const { endpoint, searchParams, method, headers, postBody } = state;

  const endpointOrEmptyTag = endpoint || EMPTY_ENDPOINT_TAG;

  if (isMethodWithBody(method)) {
    const encodedEndpoint = encodeBase64(
      replaceVariablesInStr(endpointOrEmptyTag, variables),
    );
    const postBodyWithoutVariables = {
      ...postBody,
      data: replaceVariablesInStr(postBody.data, variables),
    };

    const encodedBody = encodeBase64(JSON.stringify(postBodyWithoutVariables));

    return encodeURI(
      `/${method}/${encodedEndpoint}/${encodedBody}${createSearchParamsURLFromParams(headers)}`,
    );
  }

  const fullEndpoint = `${endpointOrEmptyTag}${createSearchParamsURLFromParams(searchParams)}`;

  const fullEndpointWithVarValues = replaceVariablesInStr(
    fullEndpoint,
    variables,
  );
  const encodedEndpoint = encodeBase64(fullEndpointWithVarValues);
  const searchParamsOfGetPageUrl = createSearchParamsURLFromParams(
    replaceVariablesInParams(headers, variables),
  );

  return encodeURI(`/${method}/${encodedEndpoint}${searchParamsOfGetPageUrl}`);
}

export function isFirstHeaderPostDefault(firstHeader: Param) {
  const { key, value } = firstHeader;
  if (
    READ_ONLY_HEADERS["plane text"].value === value ||
    READ_ONLY_HEADERS["plane text"].key === key
  )
    return true;
  return (
    READ_ONLY_HEADERS.json.value === value || READ_ONLY_HEADERS.json.key === key
  );
}

export function addReadOnlyHeader(
  headers: Param[],
  typePosBody: TypePostBody,
): Param[] {
  if (headers.length > 0 && isFirstHeaderPostDefault(headers[0])) {
    return [READ_ONLY_HEADERS[typePosBody], ...headers.slice(1)];
  }
  return [READ_ONLY_HEADERS[typePosBody], ...headers];
}
