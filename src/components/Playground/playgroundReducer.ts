import { GraphQLSchema } from "graphql/type";
import { Reducer } from "react";

interface ResponseData {
  status: number | undefined;
  body: string;
  error: string;
}

export interface PlaygroundState {
  endpoint: string;
  query: string;
  variables: string;
  headers: string;
  response: ResponseData;
  schema: GraphQLSchema | undefined;
  isLoading: boolean;
}

export enum PlaygroundActionTypes {
  SET_ENDPOINT,
  SET_QUERY,
  SET_SCHEMA,
  SET_RESPONSE,
  SET_VARIABLES,
  SET_HEADERS,
  SET_IS_LOADING,
  PRETTIFY,
}

export type PlaygroundAction =
  | { type: PlaygroundActionTypes.SET_ENDPOINT; payload: string }
  | { type: PlaygroundActionTypes.SET_QUERY; payload: string }
  | { type: PlaygroundActionTypes.SET_HEADERS; payload: string }
  | { type: PlaygroundActionTypes.SET_VARIABLES; payload: string }
  | { type: PlaygroundActionTypes.SET_RESPONSE; payload: ResponseData }
  | {
      type: PlaygroundActionTypes.SET_SCHEMA;
      payload: GraphQLSchema | undefined;
    }
  | { type: PlaygroundActionTypes.SET_IS_LOADING; payload: boolean }
  | { type: PlaygroundActionTypes.PRETTIFY };

export const playgroundReducer: Reducer<PlaygroundState, PlaygroundAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case PlaygroundActionTypes.SET_ENDPOINT: {
      return {
        ...state,
        endpoint: action.payload,
      };
    }
    case PlaygroundActionTypes.SET_QUERY: {
      return {
        ...state,
        query: action.payload,
      };
    }
    case PlaygroundActionTypes.SET_SCHEMA: {
      return {
        ...state,
        schema: action.payload,
        isLoading: false,
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
    case PlaygroundActionTypes.SET_VARIABLES: {
      return {
        ...state,
        variables: action.payload,
      };
    }
    case PlaygroundActionTypes.SET_HEADERS: {
      return {
        ...state,
        headers: action.payload,
      };
    }
    case PlaygroundActionTypes.PRETTIFY: {
      return state;
    }
    default:
      return state;
  }
};
