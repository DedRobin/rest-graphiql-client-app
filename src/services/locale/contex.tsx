"use client";

import { LSKey } from "@/constants/localStorageKeys";
import { useLocalStorage } from "@/hooks/localStorageHook";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { isTLanguage } from "./utils";

export type TLanguage = "en" | "ru";

interface LocaleContextProps {
  language: TLanguage;
  changeLanguage: (updatedValue: TLanguage) => void;
}

const LocaleContext = createContext<LocaleContextProps>({
  language: "en",
  changeLanguage: {} as (updatedValue: TLanguage) => void,
});

export function LocaleProvider({ children }: PropsWithChildren) {
  const { value, setNewValue } = useLocalStorage(LSKey.Language);

  const changeLanguage = (updatedValue: TLanguage) => {
    setNewValue(updatedValue);
  };

  useEffect(() => {
    const lang = localStorage.getItem(LSKey.Language);
    if (!isTLanguage(lang)) localStorage.setItem(LSKey.Language, "en");
  }, []);

  return (
    <LocaleContext.Provider
      value={{ language: value as TLanguage, changeLanguage }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
