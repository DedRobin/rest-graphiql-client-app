"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route } from "@/app/routes";
import { useLocale } from "@/services/locale/contex";
import localeData from "@/services/locale/lang.json";

export default function UnauthenticatedSidebarNavigation() {
  const pathname = usePathname();
  const { language } = useLocale();

  const isActive = (route: string) => pathname === route;

  return (
    <>
      <Link
        href={Route.Main}
        className={`text-h6 font-h6 leading-h6 tracking-h6 ${
          isActive(Route.Main) ? "text-lightGray" : ""
        }`}
      >
        {localeData.unauthenticatedSidebarNavigation.main[language]}
      </Link>
      <Link
        href={Route.Login}
        className={`text-h6 font-h6 leading-h6 tracking-h6 ${
          isActive(Route.Login) ? "text-lightGray" : ""
        }`}
      >
        {localeData.unauthenticatedSidebarNavigation.login[language]}
      </Link>
      <Link
        href={Route.Registration}
        className={`text-h6 font-h6 leading-h6 tracking-h6 ${
          isActive(Route.Registration) ? "text-lightGray" : ""
        }`}
      >
        {localeData.unauthenticatedSidebarNavigation.register[language]}
      </Link>
    </>
  );
}
