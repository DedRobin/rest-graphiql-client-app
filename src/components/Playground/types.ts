import { GraphQLSchema } from "graphql/type";

export interface ResponseData {
  status: number | undefined;
  body: string;
  error: string;
}

export interface PlaygroundSettings {
  endpoint: string;
  query: string;
  variables: string;
  headers: URLSearchParams;
}

export interface PlaygroundState {
  response: ResponseData;
  schema: GraphQLSchema | undefined;
  isLoading: boolean;
  settings: PlaygroundSettings;
}
