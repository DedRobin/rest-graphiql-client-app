"use client";

import { LSKey } from "@/constants/localStorageKeys";
import { useLocalStorage } from "@/hooks/localStorageHook";
import { createContext, PropsWithChildren, useContext } from "react";
import { isTLanguage } from "./utils";

export type TLanguage = "en" | "ru";

const LocaleContext = createContext<TLanguage>("en");

export function LocaleProvider({ children }: PropsWithChildren) {
  const { value: language } = useLocalStorage(LSKey.Language);

  return (
    <LocaleContext.Provider value={isTLanguage(language) ? language : "en"}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
