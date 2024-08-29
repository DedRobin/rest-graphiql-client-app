"use client";

import { LSKey } from "./constants";
import { useLocalStorage } from "@/hooks/localStorageHook";
import { HistoryData } from "@/components/History/Data";
import { HistoryFallback } from "@/components/History/Fallback";
import { mockHistoryData } from "./__mocks__/mockHistoryData";
import { Loader } from "@/components/UI/Loader";
import styles from "./style.module.css";

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
      {!historyData ? (
        <button
          className={styles.button}
          onClick={() => setHistoryData(mockHistoryData)}
        >
          Add data
        </button>
      ) : (
        <button
          className={styles.button}
          onClick={() => setHistoryData(undefined)}
        >
          Clear
        </button>
      )}
      {/* END Temporary plug */}
    </div>
  );
}
