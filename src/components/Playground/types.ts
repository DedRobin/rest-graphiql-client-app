import { GraphQLSchema } from "graphql/type";
import { ResponseData } from "@/types/ResponseData";
import { Param } from "@/types/Param";

export interface PlaygroundSettings {
  endpoint: string;
  query: string;
  variables: string;
  headers: Param[];
}

export interface PlaygroundState {
  response: ResponseData;
  schema: GraphQLSchema | undefined;
  isLoading: boolean;
  settings: PlaygroundSettings;
}
