import { Reducer } from "react";
import { PostmanState } from "@/components/Postman/usePostman";
import { Param } from "@/types/Param";
import { ResponseData } from "@/types/ResponseData";
import { Method } from "@/types/Method";
import { PostBody } from "@/components/Postman/types";

export enum PostmanActionTypes {
  SET_ENDPOINT,
  SET_PARAMS,
  SET_IS_LOADING,
  SET_METHOD,
  SET_POST_BODY,
  SET_RESPONSE,
}

export type FieldWithParams = "variables" | "headers" | "searchParams";

export type PostmanAction =
  | { type: PostmanActionTypes.SET_ENDPOINT; payload: string }
  | {
      type: PostmanActionTypes.SET_PARAMS;
      field: FieldWithParams;
      payload: Param[];
    }
  | { type: PostmanActionTypes.SET_IS_LOADING; payload: boolean }
  | { type: PostmanActionTypes.SET_RESPONSE; payload: ResponseData }
  | { type: PostmanActionTypes.SET_POST_BODY; payload: PostBody }
  | { type: PostmanActionTypes.SET_METHOD; payload: Method };

export const postmanReducer: Reducer<PostmanState, PostmanAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case PostmanActionTypes.SET_PARAMS: {
      return {
        ...state,
        [action.field]: action.payload,
      };
    }
    case PostmanActionTypes.SET_ENDPOINT: {
      return {
        ...state,
        endpoint: action.payload,
      };
    }
    case PostmanActionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case PostmanActionTypes.SET_METHOD: {
      return {
        ...state,
        method: action.payload,
      };
    }
    case PostmanActionTypes.SET_POST_BODY: {
      return {
        ...state,
        postBody: action.payload,
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
