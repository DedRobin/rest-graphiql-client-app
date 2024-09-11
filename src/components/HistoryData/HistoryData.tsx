import { DataItem } from "./DataItem";

export function HistoryData({
  historyData,
}: {
  historyData: { [key: string]: string }[];
}) {
  return (
    <>
      {historyData.map((item, index) => (
        <DataItem key={index} item={item} />
      ))}
    </>
  );
}
