import { RestfullSettings } from "@/components/Postman/usePostman";
import { createSearchParamsURLFormParams } from "@/utils/paramsUtils";
import { encodeBase64 } from "@/utils/base64";
import { Param } from "@/components/Postman/types";

export function createRestfullURL(
  settings: RestfullSettings,
  variables: Param[],
): string {
  const { endpoint, searchParams, method } = settings;

  const fullEndpoint = `${endpoint}${createSearchParamsURLFormParams(searchParams)}`;

  const fullEndpointWithVarValues = replaceTagsToVariableValue(
    fullEndpoint,
    variables,
  );

  const encodedEndpoint = encodeBase64(fullEndpointWithVarValues);

  // const encodedBody = encodeBase64("encodedBody");

  return `/${method}/${encodedEndpoint}`;
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
