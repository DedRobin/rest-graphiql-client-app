import { TempButton } from "@/components/UI/TempButton";
import React from "react";
import { ReadOnlyEditor } from "@/components/Editors/ReadOnlyEditor";
import { usePostman } from "@/components/Postman/usePostman";
import { VariablesViewer } from "@/components/Postman/VariablesViewer/VariablesViewer";

export function Postman() {
  const {
    executeQuery,
    setNewSetting,
    endpoint,
    response,
    isLoading,
    variables,
    setVariables,
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
        <VariablesViewer variables={variables} setVariables={setVariables} />
        {/*Response*/}
        <ReadOnlyEditor value={responseValue} />
      </div>
    </div>
  );
}
