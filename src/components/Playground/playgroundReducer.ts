import { Param } from "@/types/Param";
import { ResponseData } from "@/types/ResponseData";
import { GraphQLSchema } from "graphql";
import { PlaygroundState } from "@/components/Playground/types";

type Action =
  | { type: "SET_ENDPOINT"; payload: string }
  | { type: "SET_ENDPOINT_SDL"; payload: string }
  | { type: "SET_VARIABLES"; payload: string }
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_HEADERS"; payload: Param[] }
  | { type: "SET_RESPONSE"; payload: ResponseData }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SCHEMA"; payload: GraphQLSchema | undefined };

export function playgroundReducer(
  state: PlaygroundState,
  action: Action,
): PlaygroundState {
  switch (action.type) {
    case "SET_ENDPOINT":
      return { ...state, endpoint: action.payload };
    case "SET_ENDPOINT_SDL":
      return { ...state, endpointSdl: action.payload };
    case "SET_VARIABLES":
      return { ...state, variables: action.payload };
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_HEADERS":
      return { ...state, headers: action.payload };
    case "SET_RESPONSE":
      return { ...state, response: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_SCHEMA":
      return { ...state, schema: action.payload };
    default:
      return state;
  }
}
