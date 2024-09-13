"use client";

import { Postman } from "@/components/Postman/Postman";
import { PostmanURLState } from "@/components/Postman/types";

export default function RestfullClient({
  urlState,
}: {
  urlState: PostmanURLState;
}) {
  return (
    <div>
      <h1 className="graphiql text-5xl">Restfull Client</h1>
      <Postman urlState={urlState} />
    </div>
  );
}
