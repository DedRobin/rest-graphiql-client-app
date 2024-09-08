"use client";

import { Playground } from "@/components/Playground/Playground";
import { PlaygroundSettings } from "@/components/Playground/usePlayground";
import { useLocale } from "@/services/locale/contex";
import localeData from "@/services/locale/lang.json";

export default function GraphiQL({
  settings,
}: {
  settings: PlaygroundSettings;
}) {
  const { language } = useLocale();
  return (
    <div>
      <h1 className="graphiql text-5xl">
        {localeData.graphql.heading[language]}
      </h1>
      <Playground settings={settings} />
    </div>
  );
}
