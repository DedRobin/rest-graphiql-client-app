import { Param } from "@/types/Param";

export interface PlaygroundURLState {
  endpoint: string;
  query: string;
  variables: string;
  headers: Param[];
}
