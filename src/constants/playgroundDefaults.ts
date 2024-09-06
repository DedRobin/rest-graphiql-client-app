import { PlaygroundSettings } from "@/components/Playground/types";

export const PLAYGROUND_DEFAULT_SETTINGS: PlaygroundSettings = {
  endpoint: encodeURI("https://rickandmortyapi.com/graphql"),
  query:
    "query ($filter: FilterCharacter) {characters(filter: $filter) { results { name } }}",
  variables: '{"filter":{"name":"black"}}',
  headers: new URLSearchParams(),
} as const;
