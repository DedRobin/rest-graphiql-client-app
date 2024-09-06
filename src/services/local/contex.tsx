import { LSKey } from "@/constants/localStorageKeys";
import { useLocalStorage } from "@/hooks/localStorageHook";
import { createContext, PropsWithChildren, useContext } from "react";

export type TLanguage = "en" | "ru";

const LocaleContext = createContext<TLanguage | null>(null);

export function LocaleProvider({ children }: PropsWithChildren) {
  const [language] = useLocalStorage<TLanguage>(LSKey.Language);

  return (
    <LocaleContext.Provider value={language || "en"}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
