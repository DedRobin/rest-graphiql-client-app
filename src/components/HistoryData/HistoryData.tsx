import { useLocale } from "@/services/locale/contex";
import { DataItem } from "./DataItem";
import localeData from "@/services/locale/lang.json";
export function HistoryData({
  historyData,
}: {
  historyData: { [key: string]: string }[];
}) {
  const { language } = useLocale();

  return (
    <>
      <h1 className="text-5xl">{localeData.history.heading[language]}</h1>
      <div className="history-requests flex flex-col justify-center gap-3 hover:*:text-lime-500 hover:*:border-lime-500">
        {historyData.map((item, index) => (
          <DataItem key={index} item={item} />
        ))}
      </div>
    </>
  );
}
