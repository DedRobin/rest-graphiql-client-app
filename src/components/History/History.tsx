import React from "react";
import { useLocale } from "@/services/locale/contex";
import { cn } from "@/utils/cn";
import localeData from "@/services/locale/lang.json";
import { HistoryFallback } from "@/components/History/Fallback";
import { HistoryArticle } from "@/components/History/HistoryArticle/HistoryArticle";
import { useHistoryStorage } from "@/hooks/useHistoryStorage";

export function History() {
  const { historyLines } = useHistoryStorage();

  const { language } = useLocale();
  console.log("render");

  return (
    <>
      {/* Заголовок и описание */}
      <div
        className={cn(
          "flex-container col-span-8 sm:col-span-8",
          "md:col-span-2 lg:col-span-2",
          "self-start",
        )}
      >
        <h2>{localeData.history.heading[language]}</h2>
        <span>
          Track all your previous API requests in one convenient place. The
          History Requests section allows you to quickly revisit and reuse your
          past queries, ensuring a seamless workflow and saving you valuable
          time.
        </span>
      </div>

      {/* Средний div для отображения данных или состояния загрузки */}
      <div
        className={cn(
          "col-span-8 flex-container flex flex-col gap-8 mt-3 mb-3 max-w-none max-h-[calc(100vh-120px)] overflow-y-auto custom-scroll",
          "lg:col-span-4 lg:col-start-3",
          "md:col-start-3 md:col-span-6 md:max-h-[calc(100vh-120px)]",
          "sm:col-span-8 sm:max-h-none",
          "self-start",
        )}
      >
        {historyLines.length > 0 ? (
          historyLines.map((historyLine) => (
            <HistoryArticle key={historyLine.id} historyLine={historyLine} />
          ))
        ) : (
          <HistoryFallback />
        )}
      </div>
    </>
  );
}
