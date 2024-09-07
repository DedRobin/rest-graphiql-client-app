import { useState } from "react";
import { ResponseData } from "@/components/Playground/types";
import { makeRequest } from "@/services/requests/makeRequest";
import { Param } from "@/components/Postman/types";
import {
  createRecordFromParams,
  createSearchParamsURLFormParams,
} from "@/utils/paramsUtils";

interface RestfullSettings {
  endpoint: string;
  postBody: string | undefined;
  method: "GET" | "POST";
}

const initSettings: RestfullSettings = {
  endpoint: "https://dummyjson.com/products/search",
  postBody: undefined,
  method: "GET",
};

export function usePostman() {
  // const slug = usePathname().split("/");

  const [settings, setSettings] = useState<RestfullSettings>(initSettings);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<Param[]>([]);
  const [variables, setVariables] = useState<Param[]>([]);
  const [headers, setHeaders] = useState<Param[]>([]);
  const [response, setResponse] = useState<ResponseData>({
    status: undefined,
    body: "",
    error: "",
  });

  const { endpoint, method, postBody } = settings;

  const fullEndpoint = `${endpoint}${createSearchParamsURLFormParams(searchParams)}`;

  async function executeQuery() {
    setIsLoading(true);
    const res = await makeRequest(
      fullEndpoint,
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

  function setNewSetting(
    settingName: keyof RestfullSettings,
    value: string | URLSearchParams,
  ) {
    if (settings[settingName] === value) {
      return;
    }
    const newSettings = { ...settings, [settingName]: value };

    setSettings(newSettings);
  }

  return {
    executeQuery,
    setNewSetting,
    response,
    ...settings,
    isLoading,
    variables,
    headers,
    setVariables,
    setHeaders,
    searchParams,
    setSearchParams,
  };
}
