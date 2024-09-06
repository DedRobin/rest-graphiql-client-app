import { LSKey } from "@/constants/localStorageKeys";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useLocalStorage(key: LSKey): {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
} {
  const initValue = localStorage.getItem(key) || "";
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return { value, setValue };
}
