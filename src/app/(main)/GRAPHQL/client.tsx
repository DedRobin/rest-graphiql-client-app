"use client";

import Link from "next/link";

import { PLAYGROUND_DEFAULT_SETTINGS } from "@/constants/playgroundDefaults";
import { Route } from "@/app/routes";

import { encodePlaygroundSettings } from "@/utils/urlUtils";

export default function GraphiQL() {
  const encodedSettings = encodePlaygroundSettings(PLAYGROUND_DEFAULT_SETTINGS);

  return (
    <div>
      <h1 className="graphiql">GraphiQL Editor</h1>
      <h2 className="text-5xl mt-11 ">
        <Link href={`${Route.GraphQL}/${encodedSettings}`}>
          Go To True link
        </Link>
      </h2>
      {/*<Playground />*/}
    </div>
  );
}
