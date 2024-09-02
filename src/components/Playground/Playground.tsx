import { TempButton } from "@/components/UI/TempButton";
import {
  PlaygroundSettings,
  usePlayground,
} from "@/components/Playground/usePlayground";
import { SchemaViewer } from "@/components/Playground/SchemaViewer/SchemaViewer";

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
  } = usePlayground(settings);

  return (
    <div>
      <div className={"flex gap-2"}>
        <TempButton title="Prettify">Prettify</TempButton>
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
        <textarea
          rows={8}
          placeholder="Query"
          defaultValue={query}
          onBlur={(event) => setNewSetting("query", event.target.value)}
        />
        <textarea
          rows={8}
          placeholder="Variables"
          defaultValue={variables}
          onBlur={(event) => setNewSetting("variables", event.target.value)}
        />
        <textarea
          rows={8}
          placeholder="Response"
          defaultValue={response.body || response.error}
        />
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
