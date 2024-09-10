import { GraphQLSchema } from "graphql/type";
import { ResponseData } from "@/types/ResponseData";

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
