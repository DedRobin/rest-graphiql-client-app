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

  const [query, setQuery] = useState<string>(PLAYGROUND_DEFAULTS.query);
  const [response, setResponse] = useState<string | undefined>(undefined);

  const [schema, setSchema] = useState<GraphQLSchema | undefined>();

  async function getSchema() {
    setSchema(undefined);
    const requestHeaders = createHeadersOfRequest("");
    const introspectionQuery = getIntrospectionQuery();
    const requestBody = createBodyOfRequest("", introspectionQuery);

    const schemaData = await makeRequest(
      endpoint,
      requestHeaders,
      requestBody,
      "POST",
    );
    const clientSchema = buildClientSchema(schemaData.data);
    setSchema(clientSchema);
  }

  async function executeQuery() {
    const requestHeaders = createHeadersOfRequest("");
    const requestBody = createBodyOfRequest("", query);

    const responseData = await makeRequest(
      endpoint,
      requestHeaders,
      requestBody,
      "POST",
    );
    setResponse(JSON.stringify(responseData));
  }

  return {
    endpoint,
    setEndpoint,
    schema,
    getSchema,
    query,
    setQuery,
    executeQuery,
    response,
  };
}
