import { LSKey } from "@/constants/localStorageKeys";
import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: LSKey,
): [T | undefined | null, typeof setLocalStorageValue] {
  const [data, setData] = useState<T | undefined | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem(key);
    if (storedData && storedData !== "undefined") {
      setData(JSON.parse(storedData));
    } else {
      setData(undefined);
    }
  }, [key]);

  const setLocalStorageValue = (value: T | undefined | null) => {
    localStorage.setItem(key, JSON.stringify(value));
    setData(value);
  };

  return [data, setLocalStorageValue];
}
