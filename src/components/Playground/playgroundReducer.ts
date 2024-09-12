import { GraphQLSchema } from "graphql/type";
import { Reducer } from "react";

import { ResponseData } from "@/types/ResponseData";
import { Param } from "@/types/Param";
import { PlaygroundState } from "@/components/Playground/usePlayground";

export enum PlaygroundActionTypes {
  SET_SCHEMA,
  SET_RESPONSE,
  SET_IS_LOADING,
  SET_STR_FIELD,
  SET_HEADERS,
}

export type FieldWithString = "variables" | "endpoint" | "query";

export type PlaygroundAction =
  | { type: PlaygroundActionTypes.SET_RESPONSE; payload: ResponseData }
  | {
      type: PlaygroundActionTypes.SET_SCHEMA;
      payload: GraphQLSchema | undefined;
    }
  | {
      type: PlaygroundActionTypes.SET_STR_FIELD;
      field: FieldWithString;
      payload: string;
    }
  | { type: PlaygroundActionTypes.SET_IS_LOADING; payload: boolean }
  | { type: PlaygroundActionTypes.SET_HEADERS; payload: Param[] };

export const playgroundReducer: Reducer<PlaygroundState, PlaygroundAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case PlaygroundActionTypes.SET_SCHEMA: {
      return {
        ...state,
        schema: action.payload,
        isLoading: false,
      };
    }
    case PlaygroundActionTypes.SET_HEADERS: {
      return {
        ...state,
        headers: action.payload,
      };
    }
    case PlaygroundActionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case PlaygroundActionTypes.SET_RESPONSE: {
      return {
        ...state,
        response: action.payload,
        isLoading: false,
      };
    }
    case PlaygroundActionTypes.SET_STR_FIELD: {
      return {
        ...state,
        [action.field]: action.payload,
      };
    }
    default:
      return state;
  }
};
