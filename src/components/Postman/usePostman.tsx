import { useEffect, useReducer } from "react";
import { makeRequest, RequestProps } from "@/services/requests/makeRequest";
import {
  createRecordFromParams,
  createSearchParamsURLFromParams,
  replaceVariablesInStr,
  replaceVariablesInParams,
} from "@/utils/paramsUtils";
import {
  addReadOnlyHeader,
  createRestfullURL,
} from "@/components/Postman/utils";
import { Param } from "@/types/Param";
import { ResponseData } from "@/types/ResponseData";
import { updateURLInBrowser } from "@/utils/updateURLInBrowser";
import { Method } from "@/types/Method";
import { PostBody, PostmanURLState } from "@/components/Postman/types";
import { READ_ONLY_HEADERS } from "@/constants/readOnlyHeaders";
import { initialPostmanState } from "@/constants/postmanEmptyState";
import { postmanReducer } from "@/components/Postman/postmanReducer";

export function usePostman(urlState: PostmanURLState) {
  const [state, dispatch] = useReducer(postmanReducer, {
    ...initialPostmanState,
    ...urlState,
  });

  const { method, endpoint, postBody, variables, searchParams, headers } =
    state;

  const setMethod = (newMethod: Method) => {
    if (newMethod === "POST") {
      const newHeaders = addReadOnlyHeader(headers, postBody.type);
      dispatch({ type: "SET_HEADERS", payload: newHeaders });
    }
    dispatch({ type: "SET_METHOD", payload: newMethod });
  };
  const setEndpoint = (endpoint: string) =>
    dispatch({ type: "SET_ENDPOINT", payload: endpoint });
  const setVariables = (variables: Param[]) =>
    dispatch({ type: "SET_VARIABLES", payload: variables });
  const setSearchParams = (searchParams: Param[]) =>
    dispatch({ type: "SET_SEARCH_PARAMS", payload: searchParams });
  const setHeaders = (headers: Param[]) =>
    dispatch({ type: "SET_HEADERS", payload: headers });
  const setPostBody = (newPostBody: PostBody) => {
    if (newPostBody.type !== postBody.type) {
      const newHeaders = [
        READ_ONLY_HEADERS[newPostBody.type],
        ...headers.slice(1),
      ];
      setHeaders(newHeaders);
    }
    dispatch({ type: "SET_POST_BODY", payload: newPostBody });
  };
  const setIsLoading = (isLoading: boolean) =>
    dispatch({ type: "SET_LOADING", payload: isLoading });
  const setResponse = (response: ResponseData) =>
    dispatch({ type: "SET_RESPONSE", payload: response });

  useEffect(() => {
    const urlState: PostmanURLState = {
      endpoint,
      searchParams,
      headers,
      method,
      postBody,
    };
    updateURLInBrowser(createRestfullURL(urlState, variables));
  }, [endpoint, searchParams, headers, method, variables, postBody]);

  function createRequestProps(): RequestProps {
    const requestHeaders = createRecordFromParams(
      replaceVariablesInParams(headers, variables),
    );

    if (method === "POST") {
      const dataWithoutVariables = replaceVariablesInStr(
        postBody.data,
        variables,
      );
      const body =
        postBody.type === "json"
          ? JSON.stringify(JSON.parse(dataWithoutVariables))
          : dataWithoutVariables;
      return {
        endpoint: encodeURI(replaceVariablesInStr(endpoint, variables)),
        method,
        headers: requestHeaders,
        body,
      };
    }

    const endpointWithSearchParams = `${endpoint}${createSearchParamsURLFromParams(searchParams)}`;

    return {
      endpoint: encodeURI(
        replaceVariablesInStr(endpointWithSearchParams, variables),
      ),
      method,
      headers: requestHeaders,
      body: undefined,
    };
  }

  async function executeQuery() {
    setIsLoading(true);
    try {
      const requestProps = createRequestProps();

      const res = await makeRequest(requestProps);

      const responseData = await res.json();

      const formattedResponse = JSON.stringify(responseData, null, 2);

      setResponse({
        body: formattedResponse,
        status: res.status,
        error: "",
      });
    } catch {
    } finally {
      setIsLoading(false);
    }
  }

  return {
    ...state,
    setMethod,
    setEndpoint,
    setSearchParams,
    setHeaders,
    setPostBody,
    setVariables,
    executeQuery,
  };
}
