import { PostmanURLState } from "@/components/Postman/types";
import { HistoryLine } from "@/components/History/types";
import Link from "next/link";
import { KeyValueBlock } from "@/components/History/HistoryArticle/KeyValueBlock";
import { createRecordFromParams } from "@/utils/paramsUtils";
import { formatDateTime } from "@/utils/formatDateTime";

export function GetArticle({
  state,
  historyLine,
}: {
  state: PostmanURLState;
  historyLine: HistoryLine;
}) {
  const { id, url } = historyLine;
  const { endpoint, headers, searchParams } = state;

  return (
    <div className="col-start-2 col-span-5 flex flex-col gap-2">
      <Link href={url}>
        <h4 className="mb-3 truncate">{endpoint}</h4>
      </Link>
      {searchParams.length > 0 && (
        <KeyValueBlock
          keyName="search params"
          value={createRecordFromParams(searchParams)}
        />
      )}
      {headers.length > 0 && (
        <KeyValueBlock
          keyName="headers"
          value={createRecordFromParams(headers)}
        />
      )}
      <KeyValueBlock keyName="date" value={formatDateTime(id)} />
    </div>
  );
}
