import { useReducer } from "react";
import { buildClientSchema, getIntrospectionQuery } from "graphql";
import { createHeadersOfRequest } from "@/services/requests/utils/createHeadersOfRequest";
import { createBodyOfRequest } from "@/services/requests/utils/createBodyOfRequest";
import { makeRequest } from "@/services/requests/makeRequest";
import {
  PlaygroundActionTypes,
  playgroundReducer,
  PlaygroundState,
} from "@/components/Playground/playgroundReducer";

export interface PlaygroundSettings {
  endpoint: string;
  query: string;
  variables: string;
  headers: string;
}

interface Message {
  message: string;
}

function hasMessage(obj: unknown): obj is Message {
  return (obj as Message)?.message !== undefined;
}

const initialPlaygroundState: PlaygroundState = {
  isLoading: false,
  response: { status: undefined, body: "", error: "" },
  schema: undefined,
};

export function usePlayground(settings: PlaygroundSettings) {
  const { endpoint, headers, variables, query } = settings;

  const [state, dispatch] = useReducer(
    playgroundReducer,
    initialPlaygroundState,
  );

  function handleError(title: string, error: unknown, status?: number) {
    const errorMessage = hasMessage(error)
      ? error.message
      : JSON.stringify(error, null, 2);

    dispatch({
      type: PlaygroundActionTypes.SET_RESPONSE,
      payload: {
        body: "",
        status,
        error: `${title}: ${status ? `Status: ${status}` : ""}  \n\n ${errorMessage}`,
      },
    });
  }

  async function getSchema() {
    dispatch({ type: PlaygroundActionTypes.SET_SCHEMA, payload: undefined });
    dispatch({ type: PlaygroundActionTypes.SET_IS_LOADING, payload: true });
    const headersOfRequest = createHeadersOfRequest();
    const introspectionQuery = getIntrospectionQuery();
    const bodyOfRequest = createBodyOfRequest(introspectionQuery);

    try {
      const response = await makeRequest(
        endpoint,
        headersOfRequest,
        bodyOfRequest,
        "POST",
      );
      const { data } = await response.json();
      const clientSchema = buildClientSchema(data);
      dispatch({
        type: PlaygroundActionTypes.SET_SCHEMA,
        payload: clientSchema,
      });
    } catch (error) {
      handleError("HTTP Error", error);
    }
  }

  async function executeQuery() {
    const headersOfRequest = createHeadersOfRequest(headers);
    const bodyOfRequest = createBodyOfRequest(query, variables);
    try {
      const response = await makeRequest(
        endpoint,
        headersOfRequest,
        bodyOfRequest,
        "POST",
      );

      const responseData = await response.json();

      if (responseData.errors) {
        handleError("GraphQL Error!", responseData, response.status);
      } else {
        dispatch({
          type: PlaygroundActionTypes.SET_RESPONSE,
          payload: {
            body: JSON.stringify(responseData, null, 2),
            status: response.status,
            error: "",
          },
        });
      }
    } catch (error) {
      handleError("HTTP Error", error);
    }
  }

  function setQuery(query: string) {
    // dispatch({
    //   type: PlaygroundActionTypes.SET_QUERY,
    //   payload: query,
    // });
    console.log("setQuery", query);
  }

  function setEndpoint(endpoint: string) {
    // dispatch({
    //   type: PlaygroundActionTypes.SET_ENDPOINT,
    //   payload: endpoint,
    // });
    console.log("setEndpoint", endpoint);
  }

  return {
    ...state,
    ...settings,
    setEndpoint,
    getSchema,
    setQuery,
    executeQuery,
  };
}
