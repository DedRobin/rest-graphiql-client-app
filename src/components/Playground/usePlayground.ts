import { useReducer } from "react";
import {
  buildClientSchema,
  getIntrospectionQuery,
  parse,
  print,
} from "graphql";
import { createHeadersOfRequest } from "@/services/requests/utils/createHeadersOfRequest";
import { createBodyOfRequest } from "@/services/requests/utils/createBodyOfRequest";
import { makeRequest } from "@/services/requests/makeRequest";
import {
  PlaygroundActionTypes,
  playgroundReducer,
  PlaygroundState,
} from "@/components/Playground/playgroundReducer";
import { hasMessageField } from "@/utils/hasMessageField";
import { useRouter, useSearchParams } from "next/navigation";
import { Route } from "@/app/routes";
import {
  createParamsTailURL,
  encodePlaygroundSettings,
} from "@/utils/urlUtils";

export interface PlaygroundSettings {
  endpoint: string;
  query: string;
  variables: string;
}

const initialPlaygroundState: PlaygroundState = {
  isLoading: false,
  response: { status: undefined, body: "", error: "" },
  schema: undefined,
};

export function usePlayground(settings: PlaygroundSettings) {
  const { push } = useRouter();
  const [state, dispatch] = useReducer(
    playgroundReducer,
    initialPlaygroundState,
  );
  const headers = useSearchParams();
  const { endpoint, variables, query } = settings;

  function handleError(title: string, error: unknown, status?: number) {
    const errorMessage = hasMessageField(error)
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
    const headersOfRequest = createHeadersOfRequest();
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

  function setNewSetting(settingName: keyof PlaygroundSettings, value: string) {
    if (settings[settingName] === value) {
      return;
    }
    const newSettings = { ...settings, [settingName]: value };

    const newURL = `${Route.GraphQL}/${encodePlaygroundSettings(newSettings)}${createParamsTailURL(headers)}`;
    push(newURL);
  }

  function updateHeaders(newHeaders: URLSearchParams) {
    const newURL = `${Route.GraphQL}/${encodePlaygroundSettings(settings)}${createParamsTailURL(newHeaders)}`;
    push(newURL);
  }

  function prettify() {
    const ast = parse(query);
    setNewSetting("query", print(ast));
  }

  return {
    ...state,
    ...settings,
    headers,
    updateHeaders,
    getSchema,
    executeQuery,
    setNewSetting,
    prettify,
  };
}
