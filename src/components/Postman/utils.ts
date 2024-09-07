import { RestfullSettings } from "@/components/Postman/usePostman";
import { createSearchParamsURLFormParams } from "@/utils/paramsUtils";
import { encodeBase64 } from "@/utils/base64";

export function createRestfullURL(settings: RestfullSettings): string {
  const { endpoint, searchParams, method } = settings;

  const fullEndpoint = `${endpoint}${createSearchParamsURLFormParams(searchParams)}`;

  const encodedEndpoint = encodeBase64(fullEndpoint);

  // const encodedBody = encodeBase64("encodedBody");

  return `/${method}/${encodedEndpoint}`;
}
