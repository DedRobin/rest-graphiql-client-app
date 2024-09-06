"use client";

import { LSKey } from "@/constants/localStorageKeys";
import { useLocalStorage } from "@/hooks/localStorageHook";
import { createContext, PropsWithChildren, useContext } from "react";
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
  const { value, setValue } = useLocalStorage(LSKey.Language);

  const changeLanguage = (updatedValue: TLanguage) => {
    setValue(updatedValue);
  };

  const language = isTLanguage(value) ? value : "en";

  return (
    <LocaleContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
