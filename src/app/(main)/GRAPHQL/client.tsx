"use client";

import Link from "next/link";
import { encode } from "js-base64";
import { PLAYGROUND_DEFAULTS } from "@/constants/playgroundDefaults";
import { Route } from "@/app/routes";
import { createBodyOfRequest } from "@/services/requests/utils/createBodyOfRequest";

export default function GraphiQL() {
  const endpoint = encode(PLAYGROUND_DEFAULTS.endpoint.trim()).replace(
    /=/g,
    "",
  );

  const body = encode(
    createBodyOfRequest(
      PLAYGROUND_DEFAULTS.query.trim(),
      PLAYGROUND_DEFAULTS.variables.trim(),
    ),
  );

  return (
    <div>
      <h1 className="graphiql">GraphiQL Editor</h1>
      <h2 className="text-5xl mt-11 ">
        <Link href={`${Route.GraphQL}/${endpoint}/${body}`}>
          Go To True link
        </Link>
      </h2>
      {/*<Playground />*/}
    </div>
  );
}
