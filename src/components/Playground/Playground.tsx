import { TempButton } from "@/components/UI/TempButton";
import {
  PlaygroundSettings,
  usePlayground,
} from "@/components/Playground/usePlayground";
import { SchemaViewer } from "@/components/Playground/SchemaViewer/SchemaViewer";
import { graphql } from "cm6-graphql";
import { EditableEditor } from "@/components/Editors/EditableEditor";
import React from "react";
import { ReadOnlyEditor } from "@/components/Editors/ReadOnlyEditor";

export function Playground({ settings }: { settings: PlaygroundSettings }) {
  const {
    endpoint,
    schema,
    getSchema,
    query,
    executeQuery,
    response,
    variables,
    setNewSetting,
    headers,
    isLoading,
    prettify,
  } = usePlayground(settings);

  const responseValue =
    (isLoading && "Loading...") || response.error || response.body || "No data";

  return (
    <div>
      <div className={"flex gap-2"}>
        <TempButton title="Prettify" onClick={prettify}>
          Prettify
        </TempButton>
        <TempButton title="Execute" onClick={executeQuery}>
          Execute
        </TempButton>
        <TempButton title="Schema" onClick={getSchema}>
          Schema
        </TempButton>
        <input
          type="text"
          placeholder="Endpoint"
          defaultValue={endpoint}
          onBlur={(event) => setNewSetting("endpoint", event.target.value)}
        />
      </div>
      <div>
        {/*VariablesEditor*/}
        <EditableEditor
          value={variables}
          setValueOnBlur={(newValue) => setNewSetting("variables", newValue)}
        />
        {/*QueryEditor*/}
        <EditableEditor
          value={query}
          setValueOnBlur={(newValue) => setNewSetting("query", newValue)}
          extensions={schema ? graphql(schema) : undefined}
        />
        {/*Response*/}
        <ReadOnlyEditor value={responseValue} />
        <textarea
          rows={8}
          placeholder="Headers"
          defaultValue={headers.toString()}
        />
      </div>
      {schema && <SchemaViewer schema={schema} />}
    </div>
  );
}
