import { useEffect, useReducer } from "react";
import { makeRequest } from "@/services/requests/makeRequest";
import {
  createParamsFromUrlSearchParams,
  createParamsFromSearchParamsUrl,
  createRecordFromParams,
  createSearchParamsURLFromParams,
} from "@/utils/paramsUtils";
import { usePathname, useSearchParams } from "next/navigation";
import { createRestfullURL } from "@/components/Postman/utils";
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

export interface PostmanState {
  endpoint: string;
  searchParams: Param[];
  postBody: string | undefined;
  method: Method;
  headers: Param[];
  variables: Param[];
  isLoading: boolean;
  response: ResponseData;
}

const initStore: PostmanState = {
  endpoint: "https://dummyjson.com/products/search", //пока указал тестовую апи
  searchParams: [],
  postBody: undefined,
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
    const res = await makeRequest(
      replaceTagsToVariableValue(fullEndpoint, variables),
      createRecordFromParams(headers),
      postBody,
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

  return {
    ...state,
    response,
    setEndpoint,
    setParamsByField,
    executeQuery,
  };
}
