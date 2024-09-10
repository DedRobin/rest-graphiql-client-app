import { Route } from "@/app/routes";
import { useLocale } from "@/services/locale/contex";
import Link from "next/link";
import localeData from "@/services/locale/lang.json";

export function HistoryFallback() {
  const { language } = useLocale();

  return (
    <>
      <div className="histoty-empty text-center text-5xl">
        <p>{localeData.history.fallback[language]}</p>
      </div>

      <div className="history-link flex justify-around gap-3 text-3xl m-10 *:border-2 *:rounded *:p-2 hover:*:text-lime-500 hover:*:border-lime-400">
        <Link className="history-link-rest" href={Route.Get}>
          REST Client
        </Link>
        <Link className="history-link-graphql" href={Route.GraphQL}>
          GraphQL Client
        </Link>
      </div>
    </>
  );
}
