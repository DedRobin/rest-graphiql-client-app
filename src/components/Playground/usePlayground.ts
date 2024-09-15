import { useState, useCallback, useEffect, useReducer } from "react";
import {
  buildClientSchema,
  getIntrospectionQuery,
  parse,
  print,
} from "graphql";
import { makeRequest, RequestProps } from "@/services/requests/makeRequest";
import { hasMessageField } from "@/utils/hasMessageField";
import {
  createEndpointSdl,
  createGraphqlBodyOfRequest,
  createPlaygroundURL,
} from "@/components/Playground/utils";
import { updateURLInBrowser } from "@/utils/updateURLInBrowser";
import { createRecordFromParams } from "@/utils/paramsUtils";
import { Param } from "@/types/Param";
import { ResponseData } from "@/types/ResponseData";
import { GraphQLSchema } from "graphql/type";
import { PlaygroundURLState } from "@/components/Playground/types";
import { initialPlaygroundState } from "@/constants/playgroundEmptyState";
import { playgroundReducer } from "@/components/Playground/playgroundReducer";
import { useHistoryStorage } from "@/hooks/useHistoryStorage";
import { toast } from "react-toastify";
import { errorMessageList } from "@/services/error-boundary/constants";
import { useLocale } from "@/services/locale/contex";
import { HttpMethod } from "@/types/Method";

export function usePlayground(urlState: PlaygroundURLState) {
  const { language } = useLocale();
  const { addNewHistoryLineToLS } = useHistoryStorage();

  const [state, dispatch] = useReducer(playgroundReducer, {
    ...initialPlaygroundState,
    ...urlState,
  });

  const [currURL, setCurrURL] = useState<string>("");

  const setEndpoint = (newEndpoint: string) => {
    if (endpointSdl === createEndpointSdl(endpoint)) {
      dispatch({
        type: "SET_ENDPOINT_SDL",
        payload: createEndpointSdl(newEndpoint),
      });
    }
    dispatch({ type: "SET_ENDPOINT", payload: newEndpoint });
  };

  const setEndpointSdl = (endpointSdl: string) =>
    dispatch({ type: "SET_ENDPOINT_SDL", payload: endpointSdl });
  const setVariables = (variables: string) =>
    dispatch({ type: "SET_VARIABLES", payload: variables });
  const setQuery = (query: string) =>
    dispatch({ type: "SET_QUERY", payload: query });
  const setHeaders = (headers: Param[]) =>
    dispatch({ type: "SET_HEADERS", payload: headers });
  const setResponse = (response: ResponseData) =>
    dispatch({ type: "SET_RESPONSE", payload: response });
  const setIsLoading = (isLoading: boolean) =>
    dispatch({ type: "SET_IS_LOADING", payload: isLoading });
  const setIsVisibleVars = (isVisible: boolean) =>
    dispatch({ type: "SET_IS_VISIBLE_VARS", payload: isVisible });
  const setSchema = (schema: GraphQLSchema | undefined) =>
    dispatch({ type: "SET_SCHEMA", payload: schema });

  const { endpoint, variables, query, headers, endpointSdl } = state;

  const handleError = useCallback(
    (title: string, error: unknown, status?: number) => {
      const errorMessage = hasMessageField(error)
        ? error.message
        : JSON.stringify(error, null, 2);

      setResponse({
        body: "",
        status,
        error: `${title}: ${status ? `Status: ${status}` : ""}  \n\n ${errorMessage}`,
      });
    },
    [],
  );

  const getSchema = useCallback(async () => {
    setSchema(undefined);
    setIsLoading(true);

    const introspectionQuery = getIntrospectionQuery();
    const bodyOfRequest = createGraphqlBodyOfRequest(introspectionQuery);

    const requestProps: RequestProps = {
      endpoint: encodeURI(endpointSdl),
      headers: createRecordFromParams(headers),
      body: bodyOfRequest,
      method: HttpMethod.POST,
    };

    try {
      const response = await makeRequest(requestProps);
      const { data } = await response.json();
      const clientSchema = buildClientSchema(data);
      setSchema(clientSchema);
    } catch (error) {
      handleError("HTTP Error", error);
    } finally {
      setIsLoading(false);
    }
  }, [endpointSdl, headers, handleError]);

  async function executeQuery() {
    setIsLoading(true);

    // const parsedVariables = safelyParseVariables(variables);
    //
    // const variablesString = JSON.stringify(parsedVariables);

    // const requestBody = {
    //   query,
    //   variables: variablesString,
    //   headers: createRecordFromParams(headers),
    // };

    const requestProps: RequestProps = {
      endpoint: encodeURI(endpoint),
      headers: createRecordFromParams(headers),
      body: createGraphqlBodyOfRequest(query, variables),
      method: HttpMethod.POST,
    };

    try {
      const response = await makeRequest(requestProps);
      const responseData = await response.json();

      if (responseData.errors) {
        handleError("GraphQL Error!", responseData, response.status);
      } else {
        setResponse({
          body: JSON.stringify(responseData, null, 2),
          status: response.status,
          error: "",
        });
        addNewHistoryLineToLS(currURL);
      }
    } catch (error) {
      handleError("HTTP Error", error);
    } finally {
      setIsLoading(false);
    }
  }

  // function safelyParseVariables(variables: string): string {
  //   try {
  //     return JSON.stringify(JSON.parse(variables));
  //   } catch (error) {
  //     console.error("Failed to parse variables as JSON:", error);
  //     return "{}";
  //   }
  // }

  useEffect(() => {
    getSchema();
  }, [endpointSdl, getSchema]);

  useEffect(() => {
    const urlState: PlaygroundURLState = {
      endpoint,
      variables,
      query,
      headers,
      endpointSdl: "",
    };
    const url = createPlaygroundURL(urlState);
    updateURLInBrowser(url);
    setCurrURL(url);
  }, [endpoint, variables, query, headers]);

  function prettify() {
    try {
      const prettifiedQuery = print(parse(query));
      if (prettifiedQuery !== query) {
        setQuery(prettifiedQuery);
      }

      // Преобразуем переменные для форматирования
      const parsedVariables = JSON.parse(variables || "{}");
      const prettifiedVariables = JSON.stringify(parsedVariables, null, 2);
      if (prettifiedVariables !== variables) {
        setVariables(prettifiedVariables);
      }
    } catch (error) {
      const { message } = error as Error;
      toast.error(
        errorMessageList[message]
          ? errorMessageList[message][language]
          : message,
      );
    }
  }

  return {
    ...state,
    executeQuery,
    setHeaders,
    setEndpoint,
    setEndpointSdl,
    setQuery,
    setVariables,
    prettify,
    setIsVisibleVars,
  };
}
