import { useEffect, useState } from "react";
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
import { updateUrlInBrowser } from "@/utils/urlUtils";
import { Method } from "@/types/Method";
import { PostBody, PostmanURLState } from "@/components/Postman/types";
import { READ_ONLY_HEADERS } from "@/constants/readOnlyHeaders";

export function usePostman(urlState: PostmanURLState) {
  const [method, setMethod] = useState<Method>(urlState.method);
  const [endpoint, setEndpoint] = useState<string>(urlState.endpoint);
  const [postBody, setPostBody] = useState<PostBody>(urlState.postBody);
  const [variables, setVariables] = useState<Param[]>([]);
  const [searchParams, setSearchParams] = useState<Param[]>(
    urlState.searchParams,
  );
  const [headers, setHeaders] = useState<Param[]>(urlState.headers);
  const [response, setResponse] = useState<ResponseData>({
    status: undefined,
    body: "",
    error: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const endpointWithSearchParams = `${endpoint}${createSearchParamsURLFromParams(searchParams)}`;

  useEffect(() => {
    const urlState: PostmanURLState = {
      endpoint,
      searchParams,
      headers,
      method,
      postBody,
    };
    updateUrlInBrowser(createRestfullURL(urlState, variables));
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
        endpoint: replaceVariablesInStr(endpoint, variables),
        method,
        headers: requestHeaders,
        body,
      };
    }
    return {
      endpoint: replaceVariablesInStr(endpointWithSearchParams, variables),
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
        status: response.status,
        error: "",
      });
    } catch {
    } finally {
      setIsLoading(false);
    }
  }

  function handleSetMethod(newMethod: Method) {
    if (newMethod === "POST") {
      const newHeaders = addReadOnlyHeader(headers, postBody.type);
      setHeaders(newHeaders);
    }

    setMethod(newMethod);
  }

  function handleSetPostBody(newPostBody: PostBody) {
    if (newPostBody.type !== postBody.type) {
      const newHeaders = [
        READ_ONLY_HEADERS[newPostBody.type],
        ...headers.slice(1),
      ];
      setHeaders(newHeaders);
    }
    setPostBody(newPostBody);
  }

  return {
    method,
    endpoint,
    headers,
    searchParams,
    postBody,
    variables,
    isLoading,
    response,
    setMethod: handleSetMethod,
    setEndpoint,
    setSearchParams,
    setHeaders,
    setPostBody: handleSetPostBody,
    setVariables,
    executeQuery,
  };
}
