import { useEffect, useState } from "react";
import { LSKey } from "@/constants/localStorageKeys";

export function useLocalStorage(
  key: LSKey,
): [value: null | string, setNewValue: (newValue: string) => void] {
  const [value, setValue] = useState<null | string>(null);

  useEffect(() => {
    const initValue = localStorage.getItem(key);
    setValue(initValue);
  }, [key]);

  const setNewValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return [value, setNewValue];
}
