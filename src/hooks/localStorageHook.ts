import { TMockHistoryData } from "@/app/(main)/history/__mocks__/mockHistoryData";
import { LSKey } from "@/app/(main)/history/constants";
import { useEffect, useState } from "react";

type TLocalStorageState = TMockHistoryData | undefined | null;

export function useLocalStorage(
  key: LSKey,
): [TLocalStorageState, typeof setLocalStorageValue] {
  const [data, setData] = useState<TLocalStorageState>(null);

  useEffect(() => {
    const storedData = localStorage.getItem(key);
    if (storedData && storedData !== "undefined") {
      setData(JSON.parse(storedData));
    } else {
      setData(undefined);
    }
  }, [key]);

  const setLocalStorageValue = (value: TLocalStorageState) => {
    localStorage.setItem(key, JSON.stringify(value));
    setData(value);
  };

  return [data, setLocalStorageValue];
}
