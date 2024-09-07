import { TempButton } from "@/components/UI/TempButton";
import React from "react";
import { ReadOnlyEditor } from "@/components/Editors/ReadOnlyEditor";
import { usePostman } from "@/components/Postman/usePostman";
import { ParamsEditor } from "@/components/ParamsEditor/ParamsEditor";

export function Postman() {
  const {
    executeQuery,
    endpoint,
    response,
    isLoading,
    variables,
    setVariables,
    headers,
    setHeaders,
    searchParams,
    setSearchParams,
    setEndpoint,
  } = usePostman();

  const responseValue =
    (isLoading && "Loading...") || response.error || response.body || "No data";

  return (
    <div>
      <div className={"flex gap-2 w-[800px]"}>
        <TempButton title="Execute" onClick={executeQuery}>
          Execute
        </TempButton>
        <input
          className="bg-gray-800 w-[800px]"
          type="text"
          placeholder="Endpoint"
          defaultValue={endpoint}
          onBlur={(event) => setEndpoint(event.target.value)}
        />
      </div>
      <div>
        <ParamsEditor params={headers} setParams={setHeaders} title="Headers" />
        <ParamsEditor
          params={searchParams}
          setParams={setSearchParams}
          title="Search Params"
        />
        <ParamsEditor
          params={variables}
          setParams={setVariables}
          title="Variables"
        />
        {/*Response*/}
        <ReadOnlyEditor value={responseValue} />
      </div>
    </div>
  );
}
