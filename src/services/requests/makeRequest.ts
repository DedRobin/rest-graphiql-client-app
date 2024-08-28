export async function makeRequest(
  endpoint: string,
  headers: Record<string, string>,
  body: string,
  method: "POST" | "GET",
) {
  const response = await fetch(endpoint, {
    method,
    headers,
    body,
  });
  return response.json();
}
