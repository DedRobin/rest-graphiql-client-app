import { PostmanURLState } from "@/components/Postman/types";
import { HistoryLine } from "@/components/History/types";
import Link from "next/link";
import { KeyValueBlock } from "@/components/History/HistoryArticle/KeyValueBlock";
import { createRecordFromParams } from "@/utils/paramsUtils";
import { formatDateTime } from "@/utils/formatDateTime";

export function PostArticle({
  state,
  historyLine,
}: {
  state: PostmanURLState;
  historyLine: HistoryLine;
}) {
  const { id, url } = historyLine;
  const { endpoint, headers, postBody } = state;
  const parsedPostBody = JSON.parse(postBody.data);

  return (
    <div className="col-start-2 col-span-5 flex flex-col gap-2">
      <Link href={url}>
        <h4 className="mb-3 truncate">{endpoint}</h4>
      </Link>
      <KeyValueBlock
        keyName="headers"
        value={createRecordFromParams(headers)}
      />
      <KeyValueBlock keyName="body" value={parsedPostBody} />

      <KeyValueBlock keyName="date" value={formatDateTime(id)} />
    </div>
  );
}
