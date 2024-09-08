import { createSearchParamsURLFromParams } from "@/utils/paramsUtils";
import { encodeBase64 } from "@/utils/base64";
import { Param } from "@/components/Postman/types";
import { PostmanState } from "@/components/Postman/usePostman";

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

export function replaceTagsToVariableValue(
  template: string,
  variables: Param[],
) {
  return template.replace(/{{(.*?)}}/g, (match, tag) => {
    const found = variables.find((variable) => variable.key === tag);
    return found ? found.value : match;
  });
}

export function convertUrlSearchParamsToParamsArray(
  searchParams: URLSearchParams,
) {
  const result: Param[] = [];
  let id = Date.now().valueOf();

  searchParams.forEach((value, key) => {
    result.push({ key, value, id });
    id += 1;
  });
  return result;
}
