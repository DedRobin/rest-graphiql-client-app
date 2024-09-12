"use client";

import { useLocalStorage } from "@/hooks/localStorageHook";
import { HistoryFallback } from "@/components/HistoryData/Fallback";
import { mockHistoryData } from "./__mocks__/mockHistoryData";
import { Loader } from "@/components/UI/Loader";
import { LSKey } from "@/constants/localStorageKeys";
import { HistoryData } from "@/components/HistoryData/HistoryData";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { useLocale } from "@/services/locale/contex";
import localeData from "@/services/locale/lang.json";

export default function History() {
  const [isMounted, setIsMounted] = useState(false);
  const { value: historyData, setNewValue: setHistoryData } = useLocalStorage(
    LSKey.HistoryData,
  );
  const { language } = useLocale();

  useEffect(() => {
    setIsMounted(true);
  }, []);
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
        {isMounted ? (
          <>
            {historyData ? (
              <HistoryData historyData={JSON.parse(historyData)} />
            ) : (
              <HistoryFallback />
            )}

            {/* Временная кнопка для добавления/удаления данных */}
            <button
              className="text-2xl m-10 border-2 rounded p-2 hover:text-lime-500 hover:border-lime-400 self-center"
              onClick={() =>
                !historyData
                  ? setHistoryData(JSON.stringify(mockHistoryData))
                  : setHistoryData("")
              }
            >
              {!historyData ? "Add data" : "Clear"}
            </button>
          </>
        ) : (
          <Loader />
        )}
      </div>

      {/* Фоновый div */}
      <div
        className={cn(
          "hidden lg:block lg:col-start-7 lg:col-span-2",
          "bg-cover bg-center bg-[url('/history-img.webp')]",
          "min-h-[calc(100vh-96px)]",
        )}
      ></div>
    </>
  );
}
