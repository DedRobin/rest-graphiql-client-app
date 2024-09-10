"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route } from "@/app/routes";
import localeData from "@/services/locale/lang.json";
import { useLocale } from "@/services/locale/contex";

export default function AuthenticatedSidebarNavigation() {
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
        {localeData.authenticatedSidebarNavigation.main[language]}
      </Link>
      <Link
        href={Route.Get}
        className={`text-h6 font-h6 leading-h6 tracking-h6 ${
          isActive(Route.Get) ? "text-lightGray" : ""
        }`}
      >
        {localeData.authenticatedSidebarNavigation.graphql[language]}
      </Link>
      <Link
        href={Route.GraphQL}
        className={`text-h6 font-h6 leading-h6 tracking-h6 ${
          isActive(Route.GraphQL) ? "text-lightGray" : ""
        }`}
      >
        {localeData.authenticatedSidebarNavigation.restfull[language]}
      </Link>
      <Link
        href={Route.History}
        className={`text-h6 font-h6 leading-h6 tracking-h6 ${
          isActive(Route.History) ? "text-lightGray" : ""
        }`}
      >
        {localeData.authenticatedSidebarNavigation.history[language]}
      </Link>
    </>
  );
}
