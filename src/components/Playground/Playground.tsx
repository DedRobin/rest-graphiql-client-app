import { TempButton } from "@/components/UI/TempButton";
import { usePlayground } from "@/components/Playground/usePlayground";
import { SchemaViewer } from "@/components/Playground/SchemaViewer/SchemaViewer";
import { graphql } from "cm6-graphql";
import { EditableEditor } from "@/components/Editors/EditableEditor";
import React from "react";
import { ReadOnlyEditor } from "@/components/Editors/ReadOnlyEditor";

export function Playground() {
  const {
    settings,
    schema,
    getSchema,
    executeQuery,
    response,
    setNewSetting,
    isLoading,
    prettify,
  } = usePlayground();

  const { headers, variables, endpoint, query } = settings;

  const responseValue =
    (isLoading && "Loading...") || response.error || response.body || "No data";
  // когда запрашиваем схему эдитор начинает прыгать  - пока видимо так оставим. после как авто подгрузку сделаем  - тут что поменяем, скорее не будет загрузка влиять на содержание респонс едитора

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
        {/*Headers*/}
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
