"use client";

import { useLocalStorage } from "@/hooks/localStorageHook";
import { HistoryFallback } from "@/components/HistoryData/Fallback";
import { mockHistoryData } from "./__mocks__/mockHistoryData";
import { Loader } from "@/components/UI/Loader";
import { LSKey } from "@/constants/localStorageKeys";
import { HistoryData } from "@/components/HistoryData/HistoryData";

export default function History() {
  const [historyData, setHistoryData] = useLocalStorage<typeof mockHistoryData>(
    LSKey.HistoryData,
  );

  return (
    <div className="flex flex-col items-center gap-3 mx-40">
      {historyData ? (
        <HistoryData historyData={mockHistoryData} />
      ) : historyData === null ? (
        <Loader />
      ) : (
        <HistoryFallback />
      )}

      {/* Temporary plug that adds fake data */}
      <button
        className="text-2xl m-10 border-2 rounded p-2 hover:text-lime-500 hover:border-lime-400 self-center"
        onClick={() =>
          !historyData
            ? setHistoryData(mockHistoryData)
            : setHistoryData(undefined)
        }
      >
        {!historyData ? "Add data" : "Clear"}
      </button>
      {/* END Temporary plug */}
    </div>
  );
}
