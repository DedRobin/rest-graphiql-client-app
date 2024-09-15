import { HttpMethod } from "@/types/Method";
import { PostBody, PostmanState } from "@/components/Postman/types";
import { Param } from "@/types/Param";
import { ResponseData } from "@/types/ResponseData";

type Action =
  | { type: "SET_METHOD"; payload: HttpMethod }
  | { type: "SET_ENDPOINT"; payload: string }
  | { type: "SET_POST_BODY"; payload: PostBody }
  | { type: "SET_VARIABLES"; payload: Param[] }
  | { type: "SET_SEARCH_PARAMS"; payload: Param[] }
  | { type: "SET_HEADERS"; payload: Param[] }
  | { type: "SET_RESPONSE"; payload: ResponseData }
  | { type: "SET_IS_LOADING"; payload: boolean }
  | { type: "SET_IS_VISIBLE_VARS"; payload: boolean };

export function postmanReducer(
  state: PostmanState,
  action: Action,
): PostmanState {
  switch (action.type) {
    case "SET_METHOD":
      return { ...state, method: action.payload };
    case "SET_ENDPOINT":
      return { ...state, endpoint: action.payload };
    case "SET_POST_BODY":
      return { ...state, postBody: action.payload };
    case "SET_VARIABLES":
      return { ...state, variables: action.payload };
    case "SET_SEARCH_PARAMS":
      return { ...state, searchParams: action.payload };
    case "SET_HEADERS":
      return { ...state, headers: action.payload };
    case "SET_RESPONSE":
      return { ...state, response: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_IS_VISIBLE_VARS":
      return { ...state, isVisibleVars: action.payload };
    default:
      return state;
  }
}
