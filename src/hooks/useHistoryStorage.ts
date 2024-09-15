import { useEffect, useState } from "react";
import { LSKey } from "@/constants/localStorageKeys";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { HistoryLine } from "@/components/History/types";
import { toast } from "react-toastify";
import localeData from "@/services/locale/lang.json";
import { useLocale } from "@/services/locale/contex";

export function useHistoryStorage() {
  const { language } = useLocale();
  const [historyDataInLs, setHistoryDataInLs] = useLocalStorage(
    LSKey.HistoryData,
  );
  const [historyLines, setHistoryLines] = useState<HistoryLine[]>([]);

  useEffect(() => {
    if (historyDataInLs) {
      try {
        const parsedHistoryData = JSON.parse(historyDataInLs);
        setHistoryLines(parsedHistoryData);
      } catch {
        setHistoryLines([]);
        localStorage.setItem(LSKey.HistoryData, "[]");
        toast.warning(localeData.history.error.jsonParse[language]);
      }
    }
  }, [historyDataInLs, language]);

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
