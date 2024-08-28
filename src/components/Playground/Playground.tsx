import { TempButton } from "@/components/UI/TempButton";
import { usePlayground } from "@/components/Playground/usePlayground";
import { SchemaViewer } from "@/components/Playground/SchemaViewer/SchemaViewer";

export function Playground() {
  const {
    endpoint,
    setEndpoint,
    schema,
    getSchema,
    query,
    setQuery,
    executeQuery,
    response,
  } = usePlayground();

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
          value={endpoint}
          onChange={(event) => setEndpoint(event.target.value)}
        />
      </div>
      <div>
        <textarea
          rows={8}
          placeholder="Query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <textarea rows={8} placeholder="Response" defaultValue={response} />
      </div>
      {schema && <SchemaViewer schema={schema} />}
    </div>
  );
}
