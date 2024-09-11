import { createSearchParamsURLFromParams } from "@/utils/paramsUtils";
import { encodeBase64 } from "@/utils/base64";
import { PostmanState } from "@/components/Postman/usePostman";
import { replaceTagsToVariableValue } from "@/utils/replaceTagsToVariableValue";
import { Param } from "@/types/Param";
import { READ_ONLY_HEADERS } from "@/constants/requestHeadersDefault";

export function createRestfullURL(settings: PostmanState): string {
  const { endpoint, searchParams, method, variables, headers } = settings;

  const fullEndpoint = `${endpoint}${createSearchParamsURLFromParams(searchParams)}`;

  const fullEndpointWithVarValues = replaceTagsToVariableValue(
    fullEndpoint,
    variables,
  );

  const encodedEndpoint = encodeBase64(fullEndpointWithVarValues);

  // const encodedBody = encodeBase64("encodedBody");

  return `/${method}/${encodedEndpoint}${createSearchParamsURLFromParams(headers)}`;
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
