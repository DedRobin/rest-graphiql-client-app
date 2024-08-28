"use client";

import { LSKey } from "./constants";
import { useLocalStorage } from "@/hooks/localStorageHook";
import { HistoryData } from "@/components/History/Data";
import { HistoryFallback } from "@/components/History/Fallback";
import { mockHistoryData } from "./__mocks__/mockHistoryData";
import { Loader } from "@/components/UI/Loader";

export default function History() {
  const [historyData, setHistoryData] = useLocalStorage(LSKey.HistoryData);

  return (
    <div className="history flex flex-col gap-3 mx-40">
      {historyData ? (
        <HistoryData historyData={mockHistoryData} />
      ) : historyData === null ? (
        <Loader />
      ) : (
        <HistoryFallback />
      )}

      {/* Temporary plug that adds fake data */}
      {!historyData ? (
        <button
          className="text-2xl m-10 border-2 rounded p-2 hover:text-lime-500 hover:border-lime-400 self-center"
          onClick={() => setHistoryData(mockHistoryData)}
        >
          Add data
        </button>
      ) : (
        <button
          className="text-2xl m-10 border-2 rounded p-2 hover:text-lime-500 hover:border-lime-400 self-center"
          onClick={() => setHistoryData(undefined)}
        >
          Clear
        </button>
      )}
      {/* END Temporary plug */}
    </div>
  );
}
