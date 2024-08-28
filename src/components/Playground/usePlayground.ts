import { useReducer, useState } from "react";
import { GraphQLSchema } from "graphql/type";
import { buildClientSchema, getIntrospectionQuery } from "graphql/utilities";
import { createHeadersOfRequest } from "@/services/requests/utils/createHeadersOfRequest";
import { createBodyOfRequest } from "@/services/requests/utils/createBodyOfRequest";
import { makeRequest } from "@/services/requests/makeRequest";
import {
  initialPlaygroundState,
  PlaygroundActions,
  playgroundReducer,
} from "@/components/Playground/playgroundReducer";

export function usePlayground() {
  const [state, dispatch] = useReducer(
    playgroundReducer,
    initialPlaygroundState,
  );
  const { endpoint, query, headers, variables, response } = state;

  const [schema, setSchema] = useState<GraphQLSchema | undefined>();

  async function getSchema() {
    setSchema(undefined);
    const headersOfRequest = createHeadersOfRequest();
    const introspectionQuery = getIntrospectionQuery();
    const bodyOfRequest = createBodyOfRequest(introspectionQuery);

    const { data } = await makeRequest(
      endpoint,
      headersOfRequest,
      bodyOfRequest,
      "POST",
    );
    const clientSchema = buildClientSchema(data);
    setSchema(clientSchema);
  }

  async function executeQuery() {
    const headersOfRequest = createHeadersOfRequest(headers);
    const bodyOfRequest = createBodyOfRequest(query, variables);

    const responseData = await makeRequest(
      endpoint,
      headersOfRequest,
      bodyOfRequest,
      "POST",
    );

    dispatch({
      type: PlaygroundActions.SET_RESPONSE,
      payload: JSON.stringify(responseData),
    });
  }

  function setQuery(query: string) {
    dispatch({
      type: PlaygroundActions.SET_QUERY,
      payload: query,
    });
  }

  function setEndpoint(endpoint: string) {
    dispatch({
      type: PlaygroundActions.SET_ENDPOINT,
      payload: endpoint,
    });
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
    headers,
    variables,
  };
}
