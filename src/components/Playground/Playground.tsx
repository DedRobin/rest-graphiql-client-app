import { TempButton } from "@/components/UI/TempButton";
import { usePlayground } from "@/components/Playground/usePlayground";
import { SchemaViewer } from "@/components/Playground/SchemaViewer/SchemaViewer";

export function Playground() {
  const { endpoint, setEndpoint } = usePlayground();
  return (
    <div>
      <div className={"flex gap-2"}>
        <TempButton title="Prettify">Prettify</TempButton>
        <TempButton title="Execute">Execute</TempButton>
        <TempButton title="Schema">Schema</TempButton>
        <input
          type="text"
          placeholder="Endpoint"
          value={endpoint}
          onChange={(event) => setEndpoint(event.target.value)}
        />
      </div>
      <div>
        <input type="text" placeholder="Request" />
        <input type="text" placeholder="Response" />
      </div>
      <SchemaViewer schema={endpoint} />
    </div>
  );
}
