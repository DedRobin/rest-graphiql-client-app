import { PlaygroundState } from "@/components/Playground/usePlayground";

const initState: PlaygroundState = {
  schema: undefined,
  isLoading: false,
  endpoint: "",
  query: "",
  variables: "",
  headers: [],
  response: {
    status: undefined,
    body: "",
    error: "",
  },
};

export const PLAYGROUND_DEFAULT_SETTINGS: PlaygroundState = {
  ...initState,
  endpoint: encodeURI("https://rickandmortyapi.com/graphql"),
  query:
    "query ($filter: FilterCharacter) {characters(filter: $filter) { results { name } }}",
  variables: '{"filter":{"name":"black"}}',
} as const;
