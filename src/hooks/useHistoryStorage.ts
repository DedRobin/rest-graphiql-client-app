import { useEffect, useState } from "react";
import { LSKey } from "@/constants/localStorageKeys";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { HistoryLine } from "@/components/History/types";

export function useHistoryStorage() {
  const [historyDataInLs, setHistoryDataInLs] = useLocalStorage(
    LSKey.HistoryData,
  );

  const [historyLines, setHistoryLines] = useState<HistoryLine[]>([]);

  useEffect(() => {
    if (!historyDataInLs) {
      setHistoryLines([]);
    } else {
      try {
        setHistoryLines(JSON.parse(historyDataInLs));
      } catch {
        setHistoryLines([]);
      }
    }
  }, [historyDataInLs]);

  const addNewHistoryLineToLS = (url: string) => {
    const id = Date.now().valueOf();
    const newHistoryLine = { id, url };
    const newHistoryLines = [...historyLines, newHistoryLine];
    setHistoryDataInLs(JSON.stringify(newHistoryLines));
    setHistoryLines(newHistoryLines);
  };

  return {
    historyLines,
    addNewHistoryLineToLS,
  };
}
