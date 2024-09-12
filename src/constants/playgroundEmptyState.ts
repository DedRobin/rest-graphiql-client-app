import { PlaygroundURLState } from "@/components/Playground/types";
import { READ_ONLY_HEADERS } from "@/constants/readOnlyHeaders";

export const emptyPlaygroundUrlState: PlaygroundURLState = {
  endpoint: encodeURI("https://rickandmortyapi.com/graphql"),
  query:
    "query ($filter: FilterCharacter) {characters(filter: $filter) { results { name } }}",
  variables: '{"filter":{"name":"black"}}',
  headers: [READ_ONLY_HEADERS.json],
};

// export const initPlaygroundUrlEmptyState: PlaygroundURLState = {
//   endpoint: "",
//   query: "",
//   variables: "",
//   headers: [READ_ONLY_HEADERS.json],
// };
