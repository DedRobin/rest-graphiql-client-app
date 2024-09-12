import { useCallback, useEffect, useState } from "react";
import { buildClientSchema, getIntrospectionQuery } from "graphql";
import { makeRequest, RequestProps } from "@/services/requests/makeRequest";

import { hasMessageField } from "@/utils/hasMessageField";
import {
  createGraphqlBodyOfRequest,
  createPlaygroundURL,
} from "@/components/Playground/utils";
import { updateUrlInBrowser } from "@/utils/urlUtils";
import { createRecordFromParams } from "@/utils/paramsUtils";
import { Param } from "@/types/Param";
import { ResponseData } from "@/types/ResponseData";
import { GraphQLSchema } from "graphql/type";
import { PlaygroundURLState } from "@/components/Playground/types";

export function usePlayground(urlState: PlaygroundURLState) {
  const [endpoint, setEndpoint] = useState<string>(urlState.endpoint);
  const [endpointSdl, setEndpointSdl] = useState<string>(
    `${urlState.endpoint}@sdl`,
  );
  const [variables, setVariables] = useState<string>("");
  const [query, setQuery] = useState<string>(urlState.query);
  const [headers, setHeaders] = useState<Param[]>(urlState.headers);
  const [response, setResponse] = useState<ResponseData>({
    status: undefined,
    body: "",
    error: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [schema, setSchema] = useState<undefined | GraphQLSchema>(undefined);
  // const initState: PlaygroundState = {
  //   ...urlState,
  //   schema: undefined,
  //   isLoading: false,
  //   response: {
  //     status: undefined,
  //     body: "",
  //     error: "",
  //   },
  // };

  // const [state, dispatch] = useReducer(playgroundReducer, initState);

  // const { endpoint, variables, query, headers } = state;

  function handleError(title: string, error: unknown, status?: number) {
    const errorMessage = hasMessageField(error)
      ? error.message
      : JSON.stringify(error, null, 2);

    setResponse({
      body: "",
      status,
      error: `${title}: ${status ? `Status: ${status}` : ""}  \n\n ${errorMessage}`,
    });
  }

  const getSchema = useCallback(async () => {
    setSchema(undefined);
    setIsLoading(true);

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
      setSchema(clientSchema);
    } catch (error) {
      handleError("HTTP Error", error);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, headers]);

  async function executeQuery() {
    setIsLoading(true);
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
        setResponse({
          body: JSON.stringify(responseData, null, 2),
          status: response.status,
          error: "",
        });
      }
    } catch (error) {
      handleError("HTTP Error", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getSchema();
  }, [endpoint, getSchema]);

  function prettify() {
    // const prettifiedQuery = print(parse(query));
    // if (prettifiedQuery !== query) {
    //   dispatch({
    //     type: PlaygroundActionTypes.SET_STR_FIELD,
    //     field: "query",
    //     payload: prettifiedQuery,
    //   });
    // }
    //
    // try {
    //   const prettifiedVariables = JSON.stringify(
    //     JSON.parse(variables),
    //     null,
    //     2,
    //   );
    //   if (prettifiedVariables !== variables) {
    //     dispatch({
    //       type: PlaygroundActionTypes.SET_STR_FIELD,
    //       field: "variables",
    //       payload: prettifiedVariables,
    //     });
    //   }
    // } catch {}
  }

  useEffect(() => {
    const urlState: PlaygroundURLState = {
      endpoint,
      variables,
      query,
      headers,
    };
    updateUrlInBrowser(createPlaygroundURL(urlState));
  }, [endpoint, variables, query, headers]);

  return {
    endpoint,
    variables,
    query,
    headers,
    response,
    isLoading,
    schema,
    endpointSdl,
    executeQuery,
    setHeaders,
    setEndpoint,
    setEndpointSdl,
    setQuery,
    setVariables,
    prettify,
  };
}
