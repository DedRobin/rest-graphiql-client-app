import { LocalStorage } from "@/app/(main)/history/constants";
import { useEffect, useState } from "react";

export function useLocalStorage(key: LocalStorage) {
  const [data, setData] = useState();

  useEffect(() => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, [key]);

  return [data, setData];
}
