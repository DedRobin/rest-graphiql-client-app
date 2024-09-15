import { PostmanURLState } from "@/components/Postman/types";
import { HttpMethod } from "@/types/Method";
import { emptyPostBody } from "@/constants/postmanEmptyState";

export function createEmptyPostmanUrlStateWithSearchParams(
  method: HttpMethod,
): PostmanURLState {
  return {
    endpoint: "https://dummyjson.com/products/add", //пока указал тестовую апи
    searchParams: [],
    postBody: emptyPostBody,
    method,
    headers: [],
  };
}
