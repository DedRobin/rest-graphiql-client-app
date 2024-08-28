"use client";

import { LocalStorage } from "./constants";
import { useLocalStorage } from "@/hooks/localStorageHook";
import { mockHistoryData } from "./__mocks__/mockRequests";
import { HistoryData } from "@/components/History/Data";
import { HistoryFallback } from "@/components/History/Fallback";

export default function History() {
  const [historyData] = useLocalStorage(LocalStorage.Requests);

  return (
    <div className="history flex flex-col gap-3 mx-40">
      {historyData ? (
        <HistoryData historyData={mockHistoryData} />
      ) : (
        <HistoryFallback />
      )}
    </div>
  );
}
