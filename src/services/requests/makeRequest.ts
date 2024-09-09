export async function makeRequest(
  endpoint: string,
  headers: Record<string, string>,
  body: string | undefined,
  method: "POST" | "GET",
) {
  return fetch(endpoint, {
    method,
    headers,
    body,
  });
}
