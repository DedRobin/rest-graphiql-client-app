import {
  PostBody,
  PostmanState,
  PostmanURLState,
} from "@/components/Postman/types";

export const emptyPostBody: PostBody = { data: "", type: "json" };

export const emptyPostmanGetUrlState: PostmanURLState = {
  endpoint: "https://dummyjson.com/products/search", //пока указал тестовую апи
  searchParams: [],
  postBody: emptyPostBody,
  method: "GET",
  headers: [],
};

export const emptyPostmanPostUrlState: PostmanURLState = {
  endpoint: "https://dummyjson.com/products/add", //пока указал тестовую апи
  searchParams: [],
  postBody: emptyPostBody,
  method: "POST",
  headers: [],
};

export const initialPostmanState: PostmanState = {
  ...emptyPostmanGetUrlState,
  variables: [],
  response: { status: undefined, body: "", error: "" },
  isLoading: false,
};

// export const emptyPostmanGetUrlState: PostmanURLState = {
//   endpoint: "", //пока указал тестовую апи
//   searchParams: [],
//   postBody: emptyPostBody,
//   method: "GET",
//   headers: [],
// };

// export const emptyPostmanUrlState: PostmanURLState = {
//   endpoint: "",
//   searchParams: [],
//   postBody: emptyPostBody,
//   method: "GET",
//   headers: [],
// };
