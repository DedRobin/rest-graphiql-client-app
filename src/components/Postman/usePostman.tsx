import { useState } from "react";
import { ResponseData } from "@/components/Playground/types";
import { makeRequest } from "@/services/requests/makeRequest";

interface RestfullSettings {
  endpoint: string;
  headers: Record<string, string>;
  postBody: string | undefined;
  method: "GET" | "POST";
}

const initSettings: RestfullSettings = {
  endpoint: "https://dummyjson.com/products",
  headers: {},
  postBody: undefined,
  method: "GET",
};

export function usePostman() {
  // const slug = usePathname().split("/");

  const [settings, setSettings] = useState<RestfullSettings>(initSettings);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [response, setResponse] = useState<ResponseData>({
    status: undefined,
    body: "",
    error: "",
  });

  const { endpoint, headers, method, postBody } = settings;

  async function executeQuery() {
    setIsLoading(true);
    const res = await makeRequest(endpoint, headers, postBody, method);

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
    setVariables,
  };
}
