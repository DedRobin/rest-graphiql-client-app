import { HttpMethod } from "@/types/Method";

export interface RequestProps {
  endpoint: string;
  headers: Record<string, string>;
  body: string | undefined;
  method: HttpMethod;
}

export async function makeRequest(props: RequestProps) {
  const { endpoint, method, headers, body } = props;
  return fetch(endpoint, {
    method,
    headers,
    body,
  });
}
