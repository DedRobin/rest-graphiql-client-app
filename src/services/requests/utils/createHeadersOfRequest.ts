import { HEADERS_DEFAULT } from "@/constantes/requestHeadersDefault";

export function createHeadersOfRequest(headers: string) {
  if (!headers) {
    return HEADERS_DEFAULT;
  }
  const parsedHeaders = JSON.parse(headers);
  return { ...parsedHeaders, ...HEADERS_DEFAULT };
}
