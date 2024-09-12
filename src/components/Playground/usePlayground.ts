import { useCallback, useEffect, useReducer } from "react";
import {
  buildClientSchema,
  getIntrospectionQuery,
  parse,
  print,
} from "graphql";
import { makeRequest, RequestProps } from "@/services/requests/makeRequest";
import {
  FieldWithString,
  PlaygroundActionTypes,
  playgroundReducer,
} from "@/components/Playground/playgroundReducer";
import { hasMessageField } from "@/utils/hasMessageField";
import { usePathname, useSearchParams } from "next/navigation";
import { decodeBase64 } from "@/utils/base64";
import {
  createGraphqlBodyOfRequest,
  createHeaders,
  createPlaygroundURL,
} from "@/components/Playground/utils";
import { updateUrlInBrowser } from "@/utils/urlUtils";
import { createRecordFromParams } from "@/utils/paramsUtils";
import { Param } from "@/types/Param";
import { ResponseData } from "@/types/ResponseData";
import { GraphQLSchema } from "graphql/type";
import { READ_ONLY_HEADERS } from "@/constants/readOnlyHeaders";

export interface PlaygroundState {
  response: ResponseData;
  schema: GraphQLSchema | undefined;
  isLoading: boolean;
  endpoint: string;
  query: string;
  variables: string;
  headers: Param[];
}

const initState: PlaygroundState = {
  schema: undefined,
  isLoading: false,
  endpoint: "",
  query: "",
  variables: "",
  headers: [READ_ONLY_HEADERS.json],
  response: {
    status: undefined,
    body: "",
    error: "",
  },
};

export function usePlayground() {
  const slug = usePathname().split("/");
  const urlSearchParams = useSearchParams();

  const stateFromUrl = parseGraphQLSlug(slug, urlSearchParams);

  const [state, dispatch] = useReducer(playgroundReducer, stateFromUrl);

  const { endpoint, variables, query, headers } = state;

  function parseGraphQLSlug(
    slug: string[],
    urlSearchParams: URLSearchParams,
  ): PlaygroundState {
    const [, , endpoint, body] = slug.map(decodeBase64);

    const headers = createHeaders(urlSearchParams);

    const stateWithoutBody: PlaygroundState = {
      ...initState,
      endpoint,
      headers,
    };

    if (!endpoint) {
      return initState;
    }

    if (!body) {
      return stateWithoutBody;
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
      updateUrlInBrowser(createPlaygroundURL(stateWithoutBody));
      console.log(
        "Проброс ошибки что в ссылке был плохой объект и мы его удалили",
      );
    }

    return { ...initState, query, endpoint, variables, headers };
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

  const getSchema = useCallback(async () => {
    dispatch({ type: PlaygroundActionTypes.SET_SCHEMA, payload: undefined });
    dispatch({ type: PlaygroundActionTypes.SET_IS_LOADING, payload: true });

    const introspectionQuery = getIntrospectionQuery();
    const bodyOfRequest = createGraphqlBodyOfRequest(introspectionQuery);

    const requestProps: RequestProps = {
      endpoint,
      headers: createRecordFromParams(headers),
      body: bodyOfRequest,
      method: "POST",
    };

    try {
      const response = await makeRequest(requestProps);
      const { data } = await response.json();
      const clientSchema = buildClientSchema(data);
      dispatch({
        type: PlaygroundActionTypes.SET_SCHEMA,
        payload: clientSchema,
      });
    } catch (error) {
      handleError("HTTP Error", error);
    }
  }, [endpoint, headers]);

  async function executeQuery() {
    dispatch({ type: PlaygroundActionTypes.SET_IS_LOADING, payload: true });
    const requestProps: RequestProps = {
      endpoint,
      headers: createRecordFromParams(headers),
      body: createGraphqlBodyOfRequest(query, variables),
      method: "POST",
    };
    try {
      const response = await makeRequest(requestProps);

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

  useEffect(() => {
    getSchema();
  }, [endpoint, getSchema]);

  function setHeaders(newHeaders: Param[]) {
    dispatch({
      type: PlaygroundActionTypes.SET_HEADERS,
      payload: newHeaders,
    });
  }

  function prettify() {
    const prettifiedQuery = print(parse(query));
    if (prettifiedQuery !== query) {
      dispatch({
        type: PlaygroundActionTypes.SET_STR_FIELD,
        field: "query",
        payload: prettifiedQuery,
      });
    }

    try {
      const prettifiedVariables = JSON.stringify(
        JSON.parse(variables),
        null,
        2,
      );
      if (prettifiedVariables !== variables) {
        dispatch({
          type: PlaygroundActionTypes.SET_STR_FIELD,
          field: "variables",
          payload: prettifiedVariables,
        });
      }
    } catch {}
  }

  function setNewStrValue(field: FieldWithString, newValue: string) {
    if (state[field] === newValue) return;
    dispatch({
      type: PlaygroundActionTypes.SET_STR_FIELD,
      field,
      payload: newValue,
    });
  }

  useEffect(() => {
    updateUrlInBrowser(createPlaygroundURL(state));
  }, [state]);

  return {
    ...state,
    getSchema,
    executeQuery,
    setNewStrValue,
    setHeaders,
    prettify,
  };
}
