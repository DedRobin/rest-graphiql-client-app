import { TempButton } from "@/components/UI/TempButton";
import React from "react";
import { ReadOnlyEditor } from "@/components/Editors/ReadOnlyEditor";
import { usePostman } from "@/components/Postman/usePostman";
import { ParamsEditor } from "@/components/ParamsEditor/ParamsEditor";

export function Postman() {
  const {
    executeQuery,
    setNewSetting,
    endpoint,
    response,
    isLoading,
    variables,
    setVariables,
    headers,
    setHeaders,
  } = usePostman();

  const responseValue =
    (isLoading && "Loading...") || response.error || response.body || "No data";

  return (
    <div>
      <div className={"flex gap-2"}>
        <TempButton title="Execute" onClick={executeQuery}>
          Execute
        </TempButton>
        <input
          type="text"
          placeholder="Endpoint"
          defaultValue={endpoint}
          onBlur={(event) => setNewSetting("endpoint", event.target.value)}
        />
      </div>
      <div>
        <ParamsEditor params={headers} setParams={setHeaders} title="Headers" />
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
