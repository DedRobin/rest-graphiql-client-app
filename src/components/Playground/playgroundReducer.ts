import { GraphQLSchema } from "graphql/type";
import { Reducer } from "react";
import {
  PlaygroundSettings,
  PlaygroundState,
  ResponseData,
} from "@/components/Playground/types";

export enum PlaygroundActionTypes {
  SET_SCHEMA,
  SET_RESPONSE,
  SET_IS_LOADING,
  SET_SETTINGS,
}

export type PlaygroundAction =
  | { type: PlaygroundActionTypes.SET_RESPONSE; payload: ResponseData }
  | {
      type: PlaygroundActionTypes.SET_SCHEMA;
      payload: GraphQLSchema | undefined;
    }
  | { type: PlaygroundActionTypes.SET_IS_LOADING; payload: boolean }
  | { type: PlaygroundActionTypes.SET_SETTINGS; payload: PlaygroundSettings };

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
    case PlaygroundActionTypes.SET_SETTINGS: {
      return {
        ...state,
        settings: action.payload,
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
    default:
      return state;
  }
};
