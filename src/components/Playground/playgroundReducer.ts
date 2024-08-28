import { PLAYGROUND_DEFAULTS } from "@/constantes/playgroundDefaults";

interface PlaygroundState {
  endpoint: string;
  query: string;
  variables: string;
  headers: string;
  response: string;
}

export const initialPlaygroundState: PlaygroundState = {
  ...PLAYGROUND_DEFAULTS,
  response: "",
  headers: "",
};

export enum PlaygroundActions {
  SET_ENDPOINT,
  SET_QUERY,
  SET_RESPONSE,
  SET_VARIABLES,
  SET_HEADERS,
  PRETTIFY,
}

export const playgroundReducer = (
  state: PlaygroundState,
  action: { type: PlaygroundActions; payload: string },
) => {
  switch (action.type) {
    case PlaygroundActions.SET_ENDPOINT: {
      return {
        ...state,
        endpoint: action.payload,
      };
    }
    case PlaygroundActions.SET_QUERY: {
      return {
        ...state,
        query: action.payload,
      };
    }
    case PlaygroundActions.SET_RESPONSE: {
      return {
        ...state,
        response: action.payload
          ? JSON.stringify(JSON.parse(action.payload), null, 2)
          : "",
      };
    }
    case PlaygroundActions.SET_VARIABLES: {
      return {
        ...state,
        variables: action.payload,
      };
    }
    case PlaygroundActions.SET_HEADERS: {
      return {
        ...state,
        headers: action.payload,
      };
    }
    case PlaygroundActions.PRETTIFY: {
      return state;
    }
    default:
      return state;
  }
};
