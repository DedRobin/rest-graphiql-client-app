"use client";

import { Playground } from "@/components/Playground/Playground";
import { useLocale } from "@/services/locale/contex";
import localeData from "@/services/locale/lang.json";

export default function GraphiQL() {
  const { language } = useLocale();
  return (
    <div>
      <h1 className="graphiql text-5xl">
        {localeData.graphql.heading[language]}
      </h1>
      <Playground />
    </div>
  );
}
