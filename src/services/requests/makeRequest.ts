import { Method } from "@/types/Method";

export async function makeRequest(
  endpoint: string,
  headers: Record<string, string>,
  body: string | undefined,
  method: Method,
) {
  return fetch(endpoint, {
    method,
    headers,
    body,
  });
}
