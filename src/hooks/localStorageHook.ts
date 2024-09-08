"use client ";

import { LSKey } from "@/constants/localStorageKeys";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useLocalStorage(key: LSKey): {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
} {
  let initValue: string | null = "";

  if (!(typeof localStorage === "undefined"))
    initValue = localStorage.getItem(key) || "";
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return { value, setValue };
}
