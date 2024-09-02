"use client";

import { Playground } from "@/components/Playground/Playground";
import { PlaygroundSettings } from "@/components/Playground/usePlayground";

export default function GraphiQL({
  settings,
}: {
  settings: PlaygroundSettings;
}) {
  return (
    <div>
      <h1 className="graphiql text-5xl">GraphiQL Editor</h1>
      <Playground settings={settings} />
    </div>
  );
}
