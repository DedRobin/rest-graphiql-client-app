import {
  PlaygroundState,
  PlaygroundURLState,
} from "@/components/Playground/types";
import { READ_ONLY_HEADERS } from "@/constants/readOnlyHeaders";

// export const emptyPlaygroundUrlState: PlaygroundURLState = {
//   endpoint: "",
//   query: "",
//   variables: "",
//   headers: [READ_ONLY_HEADERS.json],
// };

export const emptyPlaygroundUrlState: PlaygroundURLState = {
  endpoint: "https://rickandmortyapi.com/graphql",
  query:
    "query ($filter: FilterCharacter) {characters(filter: $filter) { results { name } }}",
  variables: '{"filter":{"name":"black"}}',
  headers: [READ_ONLY_HEADERS.json],
};

export const initialPlaygroundState: PlaygroundState = {
  ...emptyPlaygroundUrlState,
  response: { status: undefined, body: "", error: "" },
  isLoading: false,
  schema: undefined,
  endpointSdl: "",
};
