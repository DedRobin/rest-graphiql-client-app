"use client";

import { Playground } from "@/components/Playground/Playground";

export default function GraphiQL() {
  return (
    <div>
      <h1 className="graphiql text-5xl">GraphiQL Editor</h1>
      <Playground />
    </div>
  );
}
