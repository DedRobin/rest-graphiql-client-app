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
} from "@/components/Playground/playgroundReducer";
import { hasMessageField } from "@/utils/hasMessageField";
import { usePathname, useSearchParams } from "next/navigation";
import {
  PlaygroundSettings,
  PlaygroundState,
} from "@/components/Playground/types";
import { decodeBase64 } from "@/utils/base64";
import { createPlaygroundURL } from "@/components/Playground/utils";
import { updateUrlInBrowser } from "@/utils/urlUtils";

export function usePlayground() {
  const slug = usePathname().split("/");
  const headers = useSearchParams();

  const settings = parseGraphQLSlug(slug, headers);

  const initialPlaygroundState: PlaygroundState = {
    settings,
    isLoading: false,
    response: { status: undefined, body: "", error: "" },
    schema: undefined,
  };

  const [state, dispatch] = useReducer(
    playgroundReducer,
    initialPlaygroundState,
  );

  const { endpoint, variables, query } = settings;

  function parseGraphQLSlug(
    slug: string[],
    headers: URLSearchParams,
  ): PlaygroundSettings {
    const [, , endpoint, body] = slug.map(decodeBase64);

    const emptySettings: PlaygroundSettings = {
      query: "",
      endpoint: "",
      variables: "",
      headers,
    };

    const settingsWithoutBody: PlaygroundSettings = {
      query: "",
      endpoint,
      variables: "",
      headers,
    };

    if (!endpoint) {
      return emptySettings;
    }

    if (!body) {
      return settingsWithoutBody;
    }

    let query = "";
    let variables = "";

    try {
      const bodyObj = JSON.parse(body);
      query = bodyObj.query ? bodyObj.query : "";
      variables = bodyObj.variables
        ? JSON.stringify(bodyObj.variables, null, 2)
        : "";
    } catch {
      updateUrlInBrowser(createPlaygroundURL(settingsWithoutBody));
      console.log(
        "Проброс ошибки что в ссылке был плохой объект и мы его удалили",
      );
    }

    return { query, endpoint, variables, headers };
  }

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
    dispatch({ type: PlaygroundActionTypes.SET_IS_LOADING, payload: true });
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

  function setNewSetting(
    settingName: keyof PlaygroundSettings,
    value: string | URLSearchParams,
  ) {
    if (settings[settingName] === value) {
      return;
    }
    const newSettings = { ...settings, [settingName]: value };
    dispatch({
      type: PlaygroundActionTypes.SET_SETTINGS,
      payload: newSettings,
    });
    updateUrlInBrowser(createPlaygroundURL(newSettings));
  }

  function prettify() {
    const prettifiedQuery = print(parse(query));

    let prettifiedVariables;

    try {
      prettifiedVariables = JSON.stringify(JSON.parse(variables), null, 2);
    } catch {
      prettifiedVariables = variables;
    }

    if (prettifiedQuery === query && prettifiedVariables === variables) {
      return;
    }

    const prettifiedSettings: PlaygroundSettings = {
      query: prettifiedQuery,
      variables: prettifiedVariables,
      endpoint,
      headers,
    };
    dispatch({
      type: PlaygroundActionTypes.SET_SETTINGS,
      payload: prettifiedSettings,
    });
    updateUrlInBrowser(createPlaygroundURL(prettifiedSettings));
  }

  return {
    ...state,
    getSchema,
    executeQuery,
    setNewSetting,
    prettify,
  };
}
