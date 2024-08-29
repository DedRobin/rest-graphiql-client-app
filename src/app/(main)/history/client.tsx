"use client";

import { LSKey } from "./constants";
import { useLocalStorage } from "@/hooks/localStorageHook";
import { HistoryFallback } from "@/components/History/Fallback";
import { mockHistoryData } from "./__mocks__/mockHistoryData";
import { Loader } from "@/components/UI/Loader";
import styles from "./style.module.css";
import { HistoryData } from "@/components/History/DataList";

export default function History() {
  const [historyData, setHistoryData] = useLocalStorage(LSKey.HistoryData);

  return (
    <div className={styles.history}>
      {historyData ? (
        <HistoryData historyData={mockHistoryData} />
      ) : historyData === null ? (
        <Loader />
      ) : (
        <HistoryFallback />
      )}

      {/* Temporary plug that adds fake data */}
      <button
        className={styles.button}
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
