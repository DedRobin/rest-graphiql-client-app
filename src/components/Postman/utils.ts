import { createSearchParamsURLFromParams } from "@/utils/paramsUtils";
import { encodeBase64 } from "@/utils/base64";
import { PostmanState } from "@/components/Postman/usePostman";
import { replaceTagsToVariableValue } from "@/utils/replaceTagsToVariableValue";

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
