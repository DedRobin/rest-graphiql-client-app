import { useEffect, useReducer, useState } from "react";
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
import { HttpMethod, isMethodWithBody } from "@/types/Method";
import { PostBody, PostmanURLState } from "@/components/Postman/types";
import { READ_ONLY_HEADERS } from "@/constants/readOnlyHeaders";
import { initialPostmanState } from "@/constants/postmanEmptyState";
import { postmanReducer } from "@/components/Postman/postmanReducer";
import { useHistoryStorage } from "@/hooks/useHistoryStorage";
import { toast } from "react-toastify";
import { errorMessageList } from "@/services/error-boundary/constants";
import { useLocale } from "@/services/locale/contex";

export function usePostman(urlState: PostmanURLState) {
  const { language } = useLocale();
  const { addNewHistoryLineToLS } = useHistoryStorage();
  const [state, dispatch] = useReducer(postmanReducer, {
    ...initialPostmanState,
    ...urlState,
  });
  const [currURL, setCurrURL] = useState<string>("");

  const { method, endpoint, postBody, variables, searchParams, headers } =
    state;

  const setMethod = (newMethod: HttpMethod) => {
    if (isMethodWithBody(newMethod)) {
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
    dispatch({ type: "SET_IS_LOADING", payload: isLoading });
  const setIsVisibleVars = (isVisibleVars: boolean) =>
    dispatch({ type: "SET_IS_VISIBLE_VARS", payload: isVisibleVars });
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
    const url = createRestfullURL(urlState, variables);
    updateURLInBrowser(url);
    setCurrURL(url);
  }, [endpoint, searchParams, headers, method, variables, postBody]);

  function createRequestProps(): RequestProps {
    const requestHeaders = createRecordFromParams(
      replaceVariablesInParams(headers, variables),
    );

    if (isMethodWithBody(method)) {
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
      addNewHistoryLineToLS(currURL);
    } catch (error) {
      const { message, stack } = error as Error;
      const errorType = stack?.split(":").at(0);
      const userMessage =
        errorType && errorMessageList[errorType]
          ? errorMessageList[errorType.concat("Body")][language]
          : message;
      toast.error(userMessage);
    } finally {
      setIsLoading(false);
    }
  }

  function prettify() {
    try {
      const { data, type } = postBody;
      const parsedData = JSON.parse(data);
      const prettifiedData = JSON.stringify(parsedData, null, 2);
      setPostBody({ data: prettifiedData, type });
    } catch (error) {
      const { message, stack } = error as Error;
      const errorType = stack?.split(":").at(0);

      const userMessage =
        errorType && errorMessageList[errorType]
          ? errorMessageList[errorType][language]
          : message;
      toast.error(userMessage);
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
    setIsVisibleVars,
    executeQuery,
    prettify,
  };
}
