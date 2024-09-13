import { useEffect, useReducer } from "react";
import { makeRequest, RequestProps } from "@/services/requests/makeRequest";
import {
  createParamsFromUrlSearchParams,
  createParamsFromSearchParamsUrl,
  createRecordFromParams,
  createSearchParamsURLFromParams,
  replaceVariablesInStr,
  replaceVariablesInParams,
} from "@/utils/paramsUtils";
import { usePathname, useSearchParams } from "next/navigation";
import {
  createRestfullURL,
  isFirstHeaderPostDefault,
} from "@/components/Postman/utils";
import { decodeBase64 } from "@/utils/base64";
import {
  FieldWithParams,
  PostmanActionTypes,
  postmanReducer,
} from "@/components/Postman/postmanReducer";
import { Param } from "@/types/Param";
import { ResponseData } from "@/types/ResponseData";
import { updateUrlInBrowser } from "@/utils/urlUtils";
import { Method } from "@/types/Method";
import { PostBody } from "@/components/Postman/types";
import { READ_ONLY_HEADERS } from "@/constants/readOnlyHeaders";

export interface PostmanState {
  endpoint: string;
  searchParams: Param[];
  postBody: PostBody;
  method: Method;
  headers: Param[];
  variables: Param[];
  isLoading: boolean;
  response: ResponseData;
}

const emptyPostBody: PostBody = { data: "", type: "json" };

const initState: PostmanState = {
  endpoint: "https://dummyjson.com/products/add", //пока указал тестовую апи
  searchParams: [],
  postBody: emptyPostBody,
  method: "GET",
  headers: [],
  variables: [],
  isLoading: false,
  response: {
    status: undefined,
    body: "",
    error: "",
  },
};

export function usePostman() {
  const slug = usePathname();
  const pageSearchParams = useSearchParams();
  const parsedSettings = parseSlug(slug, pageSearchParams);

  const [state, dispatch] = useReducer(postmanReducer, parsedSettings);

  const {
    endpoint,
    method,
    postBody,
    searchParams,
    variables,
    headers,
    response,
  } = state;

  const endpointWithSearchParams = `${endpoint}${createSearchParamsURLFromParams(searchParams)}`;

  function parseSlug(
    slug: string,
    pageSearchParams: URLSearchParams,
  ): PostmanState {
    const [, method, encodedFullEndpoint, encodedBody] = slug.split("/");

    if (method !== "POST" && method !== "GET") {
      return initState;
    }

    if (!encodedFullEndpoint) {
      return {
        ...initState,
        method,
      };
    }

    const headers = createParamsFromUrlSearchParams(pageSearchParams);

    const fullEndpoint = decodeBase64(encodedFullEndpoint);
    const [endpoint, searchParamsURL] = fullEndpoint.split("?");
    const searchParams = createParamsFromSearchParamsUrl(searchParamsURL);

    const postBody: PostBody = encodedBody
      ? JSON.parse(decodeBase64(encodedBody))
      : emptyPostBody;

    return {
      ...initState,
      method,
      endpoint,
      searchParams,
      headers,
      postBody,
    };
  }

  useEffect(() => {
    updateUrlInBrowser(createRestfullURL(state));
  }, [state]);

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
    const requestProps = createRequestProps();

    const res = await makeRequest(requestProps);

    const responseData = await res.json();

    const formattedResponse = JSON.stringify(responseData, null, 2);

    dispatch({
      type: PostmanActionTypes.SET_RESPONSE,
      payload: {
        body: formattedResponse,
        status: response.status,
        error: "",
      },
    });
  }

  function addReadOnlyHeader() {
    if (headers.length > 0 && isFirstHeaderPostDefault(headers[0])) {
      const newHeaders = [
        READ_ONLY_HEADERS[postBody.type],
        ...headers.slice(1),
      ];
      setParamsByField(newHeaders, "headers");
    } else {
      const newHeaders = [READ_ONLY_HEADERS[postBody.type], ...headers];
      setParamsByField(newHeaders, "headers");
    }
  }

  function setMethod(newMethod: Method) {
    if (newMethod === "POST") {
      addReadOnlyHeader();
    }
    dispatch({
      type: PostmanActionTypes.SET_METHOD,
      payload: newMethod,
    });
  }

  function setEndpoint(newEndpoint: string) {
    dispatch({
      type: PostmanActionTypes.SET_ENDPOINT,
      payload: newEndpoint,
    });
  }

  function setParamsByField(newSearchParams: Param[], field: FieldWithParams) {
    dispatch({
      type: PostmanActionTypes.SET_PARAMS,
      field,
      payload: newSearchParams,
    });
  }

  function setPostBody(newPostBody: PostBody) {
    if (newPostBody.type !== postBody.type) {
      const newHeaders = [
        READ_ONLY_HEADERS[newPostBody.type],
        ...headers.slice(1),
      ];
      setParamsByField(newHeaders, "headers");
    }

    dispatch({
      type: PostmanActionTypes.SET_POST_BODY,
      payload: newPostBody,
    });
  }

  return {
    ...state,
    response,
    setEndpoint,
    setMethod,
    setPostBody,
    setParamsByField,
    executeQuery,
  };
}
