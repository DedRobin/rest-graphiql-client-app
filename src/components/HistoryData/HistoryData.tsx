import { DataItem } from "./DataItem";

export function HistoryData({
  historyData,
}: {
  historyData: { [key: string]: string }[];
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
