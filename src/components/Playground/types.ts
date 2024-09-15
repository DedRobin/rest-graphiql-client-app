import { Param } from "@/types/Param";
import { ResponseData } from "@/types/ResponseData";
import { GraphQLSchema } from "graphql";

export interface PlaygroundURLState {
  endpoint: string;
  endpointSdl: string;
  query: string;
  variables: string;
  headers: Param[];
}

export interface PlaygroundState extends PlaygroundURLState {
  response: ResponseData;
  isLoading: boolean;
  schema?: GraphQLSchema;
  isVisibleVars: boolean;
}
