import { LSKey } from "@/constants/localStorageKeys";
import { useEffect, useState } from "react";

export function useLocalStorage(key: LSKey): {
  value: string;
  setNewValue: (newValue: string) => void;
} {
  const [value, setValue] = useState("");

  useEffect(() => {
    const initValue = localStorage.getItem(key) || "";
    setValue(initValue);
  }, [key]);

  const setNewValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return { value, setNewValue };
}
