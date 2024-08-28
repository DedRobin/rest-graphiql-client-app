import { useState } from "react";
import { PLAYGROUND_DEFAULTS } from "@/constantes/playgroundDefaults";
import { GraphQLSchema } from "graphql/type";
import { buildClientSchema, getIntrospectionQuery } from "graphql/utilities";
import { createHeadersOfRequest } from "@/services/requests/utils/createHeadersOfRequest";
import { createBodyOfRequest } from "@/services/requests/utils/createBodyOfRequest";
import { makeRequest } from "@/services/requests/makeRequest";

export function usePlayground() {
  const [endpoint, setEndpoint] = useState<string>(
    PLAYGROUND_DEFAULTS.endpoint,
  );

  const [schema, setSchema] = useState<GraphQLSchema | undefined>();

  async function getSchema() {
    setSchema(undefined);
    const requestHeaders = createHeadersOfRequest("");
    const query = getIntrospectionQuery();
    const requestBody = createBodyOfRequest("", query);

    const schemaData = await makeRequest(
      endpoint,
      requestHeaders,
      requestBody,
      "POST",
    );

    const clientSchema = buildClientSchema(schemaData.data);
    setSchema(clientSchema);
  }

  return { endpoint, setEndpoint, schema, getSchema };
}
