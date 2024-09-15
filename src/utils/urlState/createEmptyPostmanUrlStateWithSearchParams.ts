import { PostmanURLState } from "@/components/Postman/types";
import { HttpMethod } from "@/types/Method";
import { emptyPostBody } from "@/constants/postmanEmptyState";

export function createEmptyPostmanUrlStateWithBody(
  method: HttpMethod,
): PostmanURLState {
  return {
    method,
    endpoint: "https://dummyjson.com/products/search", //пока указал тестовую апи
    searchParams: [],
    postBody: emptyPostBody,
    headers: [],
  };
}
