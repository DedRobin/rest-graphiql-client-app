import { useState } from "react";
import { ResponseData } from "@/components/Playground/types";
import { makeRequest } from "@/services/requests/makeRequest";
import { Param } from "@/components/Postman/types";
import {
  createParamsFromSearchParamsUrl,
  createRecordFromParams,
  createSearchParamsURLFormParams,
} from "@/utils/paramsUtils";
import { usePathname } from "next/navigation";
import {
  createRestfullURL,
  replaceTagsToVariableValue,
} from "@/components/Postman/utils";
import { updateUrlInBrowser } from "@/utils/updateUrlInBrowser";
import { decodeBase64 } from "@/utils/base64";

export interface RestfullSettings {
  endpoint: string;
  searchParams: Param[];
  postBody: string | undefined;
  method: "GET" | "POST";
  headers: URLSearchParams;
}

const emptySettings: RestfullSettings = {
  endpoint: "https://dummyjson.com/products/search", //пока указал тестовую апи
  searchParams: [],
  postBody: undefined,
  method: "GET",
  headers: new URLSearchParams(),
};

function parseSlug(slug: string): RestfullSettings {
  const [, method, encodedFullEndpoint, encodedBody] = slug.split("/");
  console.log(encodedBody);

  if (method !== "POST" && method !== "GET") {
    return emptySettings;
  }

  if (!encodedFullEndpoint) {
    return {
      ...emptySettings,
      method,
    };
  }

  const fullEndpoint = decodeBase64(encodedFullEndpoint);
  const [endpoint, searchParamsURL] = fullEndpoint.split("?");
  const searchParams = createParamsFromSearchParamsUrl(searchParamsURL);

  return {
    method,
    endpoint,
    searchParams,
    postBody: undefined,
    headers: new URLSearchParams(),
  };
}

export function usePostman() {
  const slug = usePathname();
  const parsedSettings = parseSlug(slug);

  const [settings, setSettings] = useState<RestfullSettings>(parsedSettings);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [variables, setVariables] = useState<Param[]>([]);
  const [headers, setHeaders] = useState<Param[]>([]);
  const [response, setResponse] = useState<ResponseData>({
    status: undefined,
    body: "",
    error: "",
  });

  const { endpoint, method, postBody, searchParams } = settings;

  const fullEndpoint = `${endpoint}${createSearchParamsURLFormParams(searchParams)}`;

  async function executeQuery() {
    setIsLoading(true);

    const res = await makeRequest(
      replaceTagsToVariableValue(fullEndpoint, variables),
      createRecordFromParams(headers),
      postBody,
      method,
    );
    const responseData = await res.json();
    setResponse({
      body: JSON.stringify(responseData, null, 2),
      status: response.status,
      error: "",
    });
    setIsLoading(false);
  }

  function setEndpoint(newEndpoint: string) {
    const newSettings = { ...settings, endpoint: newEndpoint };
    setSettings(newSettings);
    updateUrlInBrowser(createRestfullURL(newSettings, variables));
  }

  function setSearchParams(newSearchParams: Param[]) {
    const newSettings = { ...settings, searchParams: newSearchParams };
    setSettings(newSettings);
    updateUrlInBrowser(createRestfullURL(newSettings, variables));
  }

  function handleSetVariables(newVariables: Param[]) {
    setVariables(newVariables);
    updateUrlInBrowser(createRestfullURL(settings, newVariables));
  }

  return {
    executeQuery,
    setEndpoint,
    response,
    ...settings,
    isLoading,
    variables,
    headers,
    setVariables: handleSetVariables,
    setHeaders,
    searchParams,
    setSearchParams,
  };
}
