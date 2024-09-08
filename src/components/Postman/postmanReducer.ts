import { Reducer } from "react";
import { ResponseData } from "@/components/Playground/types";
import { Param } from "@/components/Postman/types";
import { PostmanState } from "@/components/Postman/usePostman";

export enum PostmanActionTypes {
  SET_RESPONSE,
  SET_ENDPOINT,
  SET_IS_LOADING,
  SET_VARIABLES,
  SET_HEADERS,
  SET_SEARCH_PARAMS,
}

export type PostmanAction =
  | { type: PostmanActionTypes.SET_RESPONSE; payload: ResponseData }
  | { type: PostmanActionTypes.SET_VARIABLES; payload: Param[] }
  | { type: PostmanActionTypes.SET_IS_LOADING; payload: boolean }
  | { type: PostmanActionTypes.SET_ENDPOINT; payload: string }
  | { type: PostmanActionTypes.SET_HEADERS; payload: Param[] }
  | { type: PostmanActionTypes.SET_SEARCH_PARAMS; payload: Param[] };

export const postmanReducer: Reducer<PostmanState, PostmanAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case PostmanActionTypes.SET_HEADERS: {
      return {
        ...state,
        headers: action.payload,
      };
    }
    case PostmanActionTypes.SET_SEARCH_PARAMS: {
      return {
        ...state,
        searchParams: action.payload,
      };
    }
    case PostmanActionTypes.SET_ENDPOINT: {
      return {
        ...state,
        endpoint: action.payload,
      };
    }
    case PostmanActionTypes.SET_VARIABLES: {
      return {
        ...state,
        variables: action.payload,
      };
    }
    case PostmanActionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case PostmanActionTypes.SET_RESPONSE: {
      return {
        ...state,
        response: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
