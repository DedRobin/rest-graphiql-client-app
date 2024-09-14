import { Route } from "@/app/routes";
import { useLocale } from "@/services/locale/contex";
import Link from "next/link";
import localeData from "@/services/locale/lang.json";

export function HistoryFallback() {
  const { language } = useLocale();

  return (
    <>
      <h4 className="text-mediumGray">
        {localeData.history.fallback[language]}
      </h4>

      <div className="flex flex-row gap-4 -mt-4">
        <Link
          href={Route.Get}
          className={`text-h6 font-h6 leading-h6 tracking-h6`}
        >
          {localeData.authenticatedSidebarNavigation.graphql[language]}
        </Link>
        <Link
          href={Route.GraphQL}
          className={`text-h6 font-h6 leading-h6 tracking-h6`}
        >
          {localeData.authenticatedSidebarNavigation.restfull[language]}
        </Link>
      </div>
    </>
  );
}
