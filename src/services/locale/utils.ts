import { TLanguage } from "./contex";

export function isTLanguage(value: unknown): value is TLanguage {
  return value === "en" || value === "ru";
}
