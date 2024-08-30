import { TMockHistoryItem } from "@/app/(main)/history/__mocks__/mockHistoryData";
import { DataItem } from "./DataItem";

export function HistoryData({
  historyData,
}: {
  historyData: TMockHistoryItem[];
}) {
  return (
    <>
      <h1 className="text-5xl">History Requests</h1>
      <div className="history-requests flex flex-col justify-center gap-3 hover:*:text-lime-500 hover:*:border-lime-500">
        {historyData.map((item, index) => (
          <DataItem key={index} item={item} />
        ))}
      </div>
    </>
  );
}
