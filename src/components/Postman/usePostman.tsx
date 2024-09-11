import { useEffect, useReducer } from "react";
import { makeRequest } from "@/services/requests/makeRequest";
import {
  createParamsFromUrlSearchParams,
  createParamsFromSearchParamsUrl,
  createRecordFromParams,
  createSearchParamsURLFromParams,
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
import { replaceTagsToVariableValue } from "@/utils/replaceTagsToVariableValue";
import { Method } from "@/types/Method";
import { PostBody } from "@/components/Postman/types";
import { READ_ONLY_HEADERS } from "@/constants/requestHeadersDefault";

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

// fetch('https://dummyjson.com/products/add', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     title: 'BMW Pencil',
//     /* other product data */
//   })
// })
//   .then(res => res.json())
//   .then(console.log);

const initStore: PostmanState = {
  endpoint: "https://dummyjson.com/products/add", //пока указал тестовую апи
  searchParams: [],
  postBody: { data: "", type: "json" },
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

  const fullEndpoint = `${endpoint}${createSearchParamsURLFromParams(searchParams)}`;

  function parseSlug(
    slug: string,
    pageSearchParams: URLSearchParams,
  ): PostmanState {
    const [, method, encodedFullEndpoint, encodedBody] = slug.split("/");

    console.log(encodedBody);

    if (method !== "POST" && method !== "GET") {
      return initStore;
    }

    if (!encodedFullEndpoint) {
      return {
        ...initStore,
        method,
      };
    }

    const headers = createParamsFromUrlSearchParams(pageSearchParams);

    const fullEndpoint = decodeBase64(encodedFullEndpoint);
    const [endpoint, searchParamsURL] = fullEndpoint.split("?");
    const searchParams = createParamsFromSearchParamsUrl(searchParamsURL);

    return {
      ...initStore,
      method,
      endpoint,
      searchParams,
      headers,
    };
  }

  useEffect(() => {
    updateUrlInBrowser(createRestfullURL(state));
  }, [state]);

  async function executeQuery() {
    const postBodyData =
      postBody.type === "json"
        ? JSON.stringify(JSON.parse(postBody.data))
        : postBody.data;

    const res = await makeRequest(
      replaceTagsToVariableValue(fullEndpoint, variables),
      createRecordFromParams(headers),
      method === "POST" ? postBodyData : undefined,
      method,
    );

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
