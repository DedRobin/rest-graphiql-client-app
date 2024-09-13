"use client";

import { Playground } from "@/components/Playground/Playground";
import { PlaygroundURLState } from "@/components/Playground/types";

export default function GraphiQL({
  urlState,
}: {
  urlState: PlaygroundURLState;
}) {
  return (
    <div className="col-span-8 grid grid-cols-8 gap-6 h-full">
      <Playground urlState={urlState} />
    </div>
  );
}
