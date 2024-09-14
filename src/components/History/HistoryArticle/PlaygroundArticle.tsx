import { PlaygroundURLState } from "@/components/Playground/types";
import { HistoryLine } from "@/components/History/types";
import Link from "next/link";
import { KeyValueBlock } from "@/components/History/HistoryArticle/KeyValueBlock";
import { createRecordFromParams } from "@/utils/paramsUtils";
import { formatDateTime } from "@/utils/formatDateTime";

export function PlaygroundArticle({
  state,
  historyLine,
}: {
  state: PlaygroundURLState;
  historyLine: HistoryLine;
}) {
  const { id, url } = historyLine;
  const { endpoint, query, headers, variables } = state;

  return (
    <div className="col-start-2 col-span-5 flex flex-col gap-2">
      <Link href={url}>
        <h4 className="mb-3 truncate">{endpoint}</h4>
      </Link>
      <KeyValueBlock keyName="query" value={query} />
      {variables !== "" && (
        <KeyValueBlock keyName="variables" value={variables} />
      )}
      <KeyValueBlock
        keyName="headers"
        value={createRecordFromParams(headers)}
      />
      <KeyValueBlock keyName="date" value={formatDateTime(id)} />
    </div>
  );
}
