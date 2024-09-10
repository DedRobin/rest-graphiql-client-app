"use client";

import { Playground } from "@/components/Playground/Playground";

export default function GraphiQL() {
  return (
    <div className="col-span-8 grid grid-cols-8 gap-6 h-full">
      <Playground />
    </div>
  );
}
